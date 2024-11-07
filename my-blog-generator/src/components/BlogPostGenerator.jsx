import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
const BlogPostGenerator = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    mainImage: null,
    heading1: '',
    paragraph1: '',
    heading2: '',
    paragraph2: '',
    authorName: '',
    authorImage: null
  });
  
  const canvasRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [field]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const generateImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw title
    ctx.fillStyle = 'black';
    ctx.font = 'bold 48px Arial';
    ctx.fillText(formData.title, 50, 80);
    
    // Draw subtitle
    ctx.font = 'italic 24px Arial';
    ctx.fillText(formData.subtitle, 50, 120);
    
    // Draw main image if exists
    if (formData.mainImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 50, 150, 700, 300);
        drawRemainingContent();
      };
      img.src = formData.mainImage;
    } else {
      drawRemainingContent();
    }
  };
  
  const drawRemainingContent = () => {
    const ctx = canvasRef.current.getContext('2d');
    let yPosition = 500;
    
    // Draw headings and paragraphs
    ctx.font = 'bold 32px Arial';
    ctx.fillText(formData.heading1, 50, yPosition);
    
    yPosition += 50;
    ctx.font = '20px Arial';
    const words1 = formData.paragraph1.split(' ');
    let line = '';
    
    words1.forEach(word => {
      const testLine = line + word + ' ';
      if (ctx.measureText(testLine).width > 700) {
        ctx.fillText(line, 50, yPosition);
        line = word + ' ';
        yPosition += 30;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, 50, yPosition);
    
    yPosition += 50;
    ctx.font = 'bold 32px Arial';
    ctx.fillText(formData.heading2, 50, yPosition);
    
    yPosition += 50;
    ctx.font = '20px Arial';
    const words2 = formData.paragraph2.split(' ');
    line = '';
    
    words2.forEach(word => {
      const testLine = line + word + ' ';
      if (ctx.measureText(testLine).width > 700) {
        ctx.fillText(line, 50, yPosition);
        line = word + ' ';
        yPosition += 30;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, 50, yPosition);
    
    // Draw author section
    yPosition += 80;
    if (formData.authorImage) {
      const img = new Image();
      img.onload = () => {
        ctx.beginPath();
        ctx.arc(75, yPosition, 25, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 50, yPosition - 25, 50, 50);
        ctx.restore();
        
        ctx.font = 'bold 20px Arial';
        ctx.fillText(formData.authorName, 120, yPosition + 10);
      };
      img.src = formData.authorImage;
    } else {
      ctx.font = 'bold 20px Arial';
      ctx.fillText(formData.authorName, 50, yPosition + 10);
    }
  };
  
  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'blog-post.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Blog Post Image Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter blog title"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter subtitle"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">Main Image</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'mainImage')}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">Heading 1</label>
            <input
              type="text"
              name="heading1"
              value={formData.heading1}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter first heading"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">Paragraph 1</label>
            <textarea
              name="paragraph1"
              value={formData.paragraph1}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-24"
              placeholder="Enter first paragraph"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">Heading 2</label>
            <input
              type="text"
              name="heading2"
              value={formData.heading2}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter second heading"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">Paragraph 2</label>
            <textarea
              name="paragraph2"
              value={formData.paragraph2}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-24"
              placeholder="Enter second paragraph"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">Author Name</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter author name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">Author Image</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'authorImage')}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={generateImage}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Generate Image
            </button>
            <button
              onClick={downloadImage}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
            >
              <Camera className="w-4 h-4 mr-2" />
              Download Image
            </button>
          </div>
        </CardContent>
      </Card>
      
      <canvas
        ref={canvasRef}
        width="800"
        height="1200"
        className="border w-full h-auto"
      />
    </div>
  );
};

export default BlogPostGenerator;