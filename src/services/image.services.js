export function getImages(formData) {
  fetch('http://localhost:3333', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      console.log('response', response)
    })
    .catch(error => {
      console.error(error);
    });
}