export async function getSingleFileOnCanvas(name: string, textOrUrl: 'text' | 'url'): Promise<string> {
  return new Promise(function(resolve, reject) {
    const id = getCurrentCourseNumber();
    fetch(
      `https://msde.instructure.com/api/v1/courses/${id}/files?per_page=100&search_term=${name}`
    ).then(async function(response) {
      if (response.ok) {
        const { id } = await filterFiles(response);
        if (id == undefined) {
          resolve(name);
          return;
        }
        fetch(
          `https://msde.instructure.com/api/v1/files/${id}/public_url`
        ).then(async function(res) {
          if (res.ok) {
            const json = await res.json();
            if (textOrUrl === 'text') {
              const text = await getTextFromUrl(json.public_url);
              resolve(text);
            } else {
              resolve(json.public_url);
            }
          } else {
            reject();
          }
        });
      } else {
        resolve(response.url.split('search_term=')[1]);
      }
    });
  });
}

function getTextFromUrl(url: string): Promise<string> {
  return new Promise(function(resolve, reject) {
    fetch(url).then(function(response) {
      if (response.ok) {
        response.text().then(function(text) {
          resolve(text);
        });
      } else {
        reject();
      }
    });
  });
}

function getCurrentCourseNumber() {
  const url = window.location.href;
  let id = url.substring(url.indexOf('courses/') + 8);
  if (id.indexOf('/') > -1) {
    id = id.substring(0, id.indexOf('/'));
  }
  if (isNaN(+id)) {
    return;
  }
  return id;
}

async function filterFiles(response: Response) {
  let search_term = response.url.split('search_term=')[1];
  //if search_term contains %20 replace with space
  search_term = search_term.replace(/%20/g, ' ');
  const json = await response.json();
  if (json.length === 0) {
    return { id: null, name: null };
  }
  const file = json.filter(function(file: { display_name: string; }) {
    return file.display_name === search_term;
  });
  if (file.length === 0) {
    return { id: undefined, name: undefined };
  }
  return { id: file[0].id, name: file[0].display_name };
}

