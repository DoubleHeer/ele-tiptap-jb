export function findAllImageElementsWithLocalSource() {
    let imgs = document.querySelectorAll('img')
    return imgs;
  }

export function extractImageDataFromRtf(rtfData) {
    if (!rtfData) {
      return [];
    }

     // 旧的写法
    // const regexPictureHeader = /{\\pict[\s\S]+?\\bliptag-?\d+(\\blipupi-?\d+)?({\\\*\\blipuid\s?[\da-fA-F]+)?[\s}]*?/
    // 新删减后的写法
    const regexPictureHeader = /{\\pict[\s\S]+?({\\\*\\blipuid\s?[\da-fA-F]+)[\s}]*/
    const regexPicture = new RegExp('(?:(' + regexPictureHeader.source + '))([\\da-fA-F\\s]+)\\}', 'g');
    const images = rtfData.match(regexPicture);
    const result = [];

    if (images) {
      for (const image of images) {
        let imageType = false;

        if (image.includes('\\pngblip')) {
          imageType = 'image/png';
        } else if (image.includes('\\jpegblip')) {
          imageType = 'image/jpeg';
        }

        if (imageType) {
          result.push({
            hex: image.replace(regexPictureHeader, '').replace(/[^\da-fA-F]/g, ''),
            type: imageType
          });
        }
      }
    }

    return result;
  }

export  function _convertHexToBase64(hexString) {
    return btoa(hexString.match(/\w{2}/g).map(char => {
      return String.fromCharCode(parseInt(char, 16));
    }).join(''));
  }

export  function replaceImagesFileSourceWithInlineRepresentation(imageElements, imagesHexSources, writer) {
    // Assume there is an equal amount of image elements and images HEX sources so they can be matched accordingly based on existing order.
    if (imageElements.length === imagesHexSources.length) {
      for (let i = 0; i < imageElements.length; i++) {
        const newSrc = `data:${imagesHexSources[i].type};base64,${_convertHexToBase64(imagesHexSources[i].hex)}`;

        imageElements[i].setAttribute('src',newSrc)
      }
    }
  }