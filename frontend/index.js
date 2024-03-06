const imageForm = document.querySelector("#imageForm")
const imageInput = document.querySelector("#imageInput")

imageForm.addEventListener("submit", async event => {
  event.preventDefault()
  const file = imageInput.files[0]

  // get secure url from our server
  const { url } = await fetch("http://localhost:8080/s3Url").then(res => res.json())
  console.log(url)

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  let imageUrl = url.split('?')[0]
  console.log(imageUrl);

  // imageUrl = 'https://s3.ap-northeast-1.wasabisys.com/hone.art/spacex-OHOU-5UVIYQ-unsplash.jpg'
  // console.log(imageUrl);

  // post requst to my server to store any extra data
  
  
  const img = document.createElement("img")

  const downloadURL = await fetch("http://localhost:8080/s3Url/download", {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"objectKey": imageUrl})
  })
  const parsedUrl = await downloadURL.text();
  // parsedUrl = await parsedUrl.json();
  console.log(parsedUrl);
  // img.src = 0;
  // document.body.appendChild(img)
})