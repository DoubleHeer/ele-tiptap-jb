import { Editor, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import TiptapImage from '@tiptap/extension-image';
import InsertImageCommandButton from '@/components/MenuCommands/Image/InsertImageCommandButton.vue';
import ImageView from '@/components/ExtensionViews/ImageView.vue';
import { ImageDisplay } from '@/utils/image';
import { Plugin } from '@tiptap/pm/state';
import {findAllImageElementsWithLocalSource,extractImageDataFromRtf,_convertHexToBase64,replaceImagesFileSourceWithInlineRepresentation} from '../hooks/paste-from-office'
import {
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_DISPLAY,
  DEFAULT_IMAGE_URL_REGEX,
} from '@/constants';

const Image = TiptapImage.extend({
  // https://github.com/ueberdosis/tiptap/issues/1206
  inline() {
    return true;
  },

  group() {
    return 'inline';
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: DEFAULT_IMAGE_WIDTH,
        parseHTML: (element) => {
          const width =
            element.style.width || element.getAttribute('width') || null;
          return width == null ? null : parseInt(width, 10);
        },
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => {
          const height =
            element.style.height || element.getAttribute('height') || null;
          return height == null ? null : parseInt(height, 10);
        },
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          };
        },
      },
      display: {
        default: DEFAULT_IMAGE_DISPLAY,
        parseHTML: (element) => {
          const { cssFloat, display } = element.style;
          let dp =
            element.getAttribute('data-display') ||
            element.getAttribute('display');
          if (dp) {
            dp = /(inline|block|left|right)/.test(dp)
              ? dp
              : ImageDisplay.INLINE;
          } else if (cssFloat === 'left' && !display) {
            dp = ImageDisplay.FLOAT_LEFT;
          } else if (cssFloat === 'right' && !display) {
            dp = ImageDisplay.FLOAT_RIGHT;
          } else if (!cssFloat && display === 'block') {
            dp = ImageDisplay.BREAK_TEXT;
          } else {
            dp = ImageDisplay.INLINE;
          }

          return dp;
        },
        renderHTML: (attributes) => {
          return {
            ['data-display']: attributes.display,
          };
        },
      },
    };
  },

  addOptions() {
    return {
      ...this.parent?.(),
      inline: true,
      uploadRequest: null,
      urlPattern: DEFAULT_IMAGE_URL_REGEX,
      button({ editor }: { editor: Editor }) {
        return {
          component: InsertImageCommandButton,
          componentProps: {
            editor,
          },
        };
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop(view, event) {
              event.preventDefault()
              console.log('触发拖拽-解析图片')
              const hasFiles = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length

              if (!hasFiles) {
                return false;
              }

              const images = Array.from(event.dataTransfer.files).filter(file => /image/i.test(file.type))

              if (images.length === 0) {
                return false;
              }

              event.preventDefault()

              const { schema } = view.state
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })

              images.forEach(image => {

                console.log(image)
                //回调上传逻辑
                // upload(image).then(url => {
                //   const node = schema.nodes.image.create({
                //     src: url
                //   })
                //   const transaction = view.state.tr.insert(coordinates.pos, node)
                //   view.dispatch(transaction)
                // })

              })
            }
          },
          handlePaste: (view, event, slice) => {
            console.log('触发粘贴--解析图片--只支持单个图片粘贴');
            const items = Array.from(event.clipboardData?.items || []);
            console.log(event.clipboardData?.getData('text/html'))
            console.log(event.clipboardData?.getData('text'))
            console.log(event.clipboardData?.getData('text/rtf'))
            console.log(items)
            for (const item of items) {
              if (item.type.indexOf("image") === 0) {
                // handle the image upload
                console.log('发现图片去上传')
                // return true; // handled
              }
            }

            return false;

          }
        

        }
      })
    ]
  },
  addNodeView() {
    return VueNodeViewRenderer(ImageView);
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },
});

export default Image;
