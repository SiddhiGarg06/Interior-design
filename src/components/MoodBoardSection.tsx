import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Upload, Download, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { Button } from './Navigation';
import { useDropzone } from 'react-dropzone';

const MoodBoardSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedElement, setSelectedElement] = useState<fabric.Object | null>(null);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#1a1a1a'
      });

      fabricCanvas.on('selection:created', (e) => {
        setSelectedElement(e.selected?.[0] || null);
      });

      fabricCanvas.on('selection:cleared', () => {
        setSelectedElement(null);
      });

      setCanvas(fabricCanvas);
    }
  }, [canvasRef, canvas]);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (!canvas) return;

    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target?.result as string, (img) => {
          img.scaleToWidth(200);
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    });
  }, [canvas]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText('Double click to edit', {
      left: 100,
      top: 100,
      fill: '#ffffff',
      fontFamily: 'Inter'
    });
    canvas.add(text);
    canvas.renderAll();
  };

  const deleteSelected = () => {
    if (!canvas || !selectedElement) return;
    canvas.remove(selectedElement);
    setSelectedElement(null);
    canvas.renderAll();
  };

  const downloadMoodBoard = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1
    });
    const link = document.createElement('a');
    link.download = 'moodboard.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <section id="mood-board" className="py-24 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                Mood Board Creator
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-transparent"></span>
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Create and customize your perfect mood board by combining images, colors, and text elements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 bg-black border border-gray-800 rounded-xl p-6">
            <canvas ref={canvasRef} className="w-full rounded-lg" />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Tools</h3>
              
              <div className="space-y-4">
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} />
                  <Button type="secondary" icon={<ImageIcon size={16} />} className="w-full">
                    Add Image
                  </Button>
                </div>

                <Button type="secondary" icon={<Plus size={16} />} onClick={addText} className="w-full">
                  Add Text
                </Button>

                <Button 
                  type="secondary" 
                  icon={<Trash2 size={16} />} 
                  onClick={deleteSelected}
                  disabled={!selectedElement}
                  className="w-full"
                >
                  Delete Selected
                </Button>

                <Button 
                  type="primary" 
                  icon={<Download size={16} />} 
                  onClick={downloadMoodBoard}
                  className="w-full"
                >
                  Download Board
                </Button>
              </div>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Tips</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Drag and drop images directly onto the canvas</li>
                <li>• Double click text to edit</li>
                <li>• Use the corner handles to resize elements</li>
                <li>• Click and drag to move elements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodBoardSection;