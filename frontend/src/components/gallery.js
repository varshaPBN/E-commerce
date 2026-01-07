"use client";

import { useEffect, useState } from "react";

const bucketUrl = "https://artloom.s3.ap-south-1.amazonaws.com/";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/images")
      .then(res => res.json())
      .then(data => setImages(data.images))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="flex gap-4 flex-wrap">
      {images.map(name => (
        <img
          key={name}
          src={bucketUrl + name}
          className="w-48 h-48 object-cover border"
        />
      ))}
    </div>
  );
}
