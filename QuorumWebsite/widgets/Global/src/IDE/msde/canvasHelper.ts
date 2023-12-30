import { getSingleFileOnCanvas } from "../../util/canvasApi";

async function replaceLoadFileNameWithURL(code: string) {
  ////get all the class's with data-file attribute
  const fileInputDiv = document.getElementsByClassName('data-file');
  const promises: Promise<string>[] = [];
  getReplacePromises(code, promises, 'Load');
  getReplacePromises(code, promises, 'CreateIcon');
  getReplacePromises(code, promises, 'CreateButton');
  getReplacePromises(code, promises, 'PlaySound');
  getReplacePromises(code, promises, 'Add');
  //return the url
  const data = await Promise.all(promises);
  code = replaceWithUrl(code, data, fileInputDiv, 'Load');
  code = replaceWithUrl(code, data, fileInputDiv, 'CreateIcon');
  code = replaceWithUrl(code, data, fileInputDiv, 'CreateButton');
  code = replaceWithUrl(code, data, fileInputDiv, 'PlaySound');
  code = replaceWithUrl(code, data, fileInputDiv, 'Add');
  return code;
}

function getReplacePromises(
  code: any,
  promises: Promise<string>[],
  keyword: string
) {
  //use the keyword to find the files to replace
  const regex = new RegExp(
    `${keyword}\\("([^.]*?)(?=.)\\.([a-z]*?)(?=")`,
    'g'
  );
  code.replace(
    regex,
    async (_: any, name: string, ext: string): Promise<void> => {
      const promise = getSingleFileOnCanvas(`${name}.${ext}`, 'url');
      promises.push(promise);
    }
  );
}

function replaceWithUrl(
  code: string,
  data: any[],
  fileInputDiv: string | any[] | HTMLCollectionOf<Element>,
  keyword: string
) {
  //replace the keyword from code with the url of the file
  // const regex = new RegExp(
  //   `${keyword}\\("([^.]*?)(?=\.)\\.([a-z]*?)(?=")`,
  //   'g'
  // );
  const regex = new RegExp(
    `${keyword}\\("([^.]*?)(?=.)\\.([a-z]*?)(?=")`,
    'g'
  );
  return code.replace(regex, (_, name, ext) => {
    const fileUrl = data.shift();
    //if the id in fileInputDiv is the same as the name of the file, dont replace it
    //used for the file upload for the IDE
    for (let i = 0; i < fileInputDiv.length; i++) {
      if (fileInputDiv[i].id == `${name}.${ext}`) {
        return `${keyword}("${name}.${ext}`;
      }
    }
    //if the fileUrl contains a url
    //if fileUrl start with http, then it is a url
    if (fileUrl.startsWith('http')) {
      return `${keyword}("${fileUrl}&ext=.${ext}`;
    }
    //if the fileUrl is undefined, return the original file name
    return `${keyword}("${name}.${ext}`;
  });
}

async function getFile(fileName: string) {
  const public_url = await getSingleFileOnCanvas(fileName, 'text');
  return public_url;
}
