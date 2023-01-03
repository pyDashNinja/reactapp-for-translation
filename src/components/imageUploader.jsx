import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './imageUploader.css';

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [text, setText] = useState(null);
  const [filename, setFileName] = useState(null);

  const sleep = (ms) => {
    const startTime = Date.now();
    while (Date.now() - startTime < ms);
  }


  useEffect(() => {
    const fetchData = async () => {
      // Send the GET request in a loop until we receive a response
      while (true) {
        sleep(1000);
        console.log(`http://127.0.0.1:5001/downloadImage?filename=${filename}`)
        try {
          const response = await axios.get(`http://127.0.0.1:5001/downloadImage?filename=${filename}`);
          setText(response.data.sentence);
          // console.log(response.data);
          break;
        } catch (error) {
        }
      }
    };

    if (file) {
      fetchData();
    }

  }, [file]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // console.log(event.target.files[0].name.toString().split(".")[0] + '.json')
    setFileName(event.target.files[0].name.toString().split(".")[0] + '.json')
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)
    // console.log(response)
    await axios.post('http://127.0.0.1:5001/uploadImage?lang=', formData).then((res) => {
    //   console.log(res.data)
      setResponse(JSON.stringify(res.data));
    }).catch(function (error) {
        // handle error
        console.log(error);
      });
    // console.log(response)
    };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {response && <div><h1>Successfully Uploaded</h1></div>}
      {text ? (
       <div><h2 className='text'>{text}</h2></div>
      ) : response ? (
          <div><h2 className="text">Loading</h2></div>
      ) : (
        <div>
        </div>
      )}
    </form>
  );
}

export default ImageUploader;