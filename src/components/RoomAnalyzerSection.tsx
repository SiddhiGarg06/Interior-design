import React, { useState } from 'react';
import { Camera, PanelRight, Maximize, PaintBucket, Palette, Scan, Lightbulb } from 'lucide-react';
import { Button } from './Navigation';

interface Analysis {
  roomSize: string;
  roomType: string;
  colorScheme: string;
  style: string;
  suggestions: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const RoomAnalyzerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'results'>('upload');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Analysis | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyzeRoom = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setActiveTab('results');
      
      // Mock analysis results
      setResults({
        roomSize: 'Medium (300-400 sq ft)',
        roomType: 'Living Room',
        colorScheme: 'Neutral with cool undertones',
        style: 'Modern Minimalist',
        suggestions: [
          {
            title: 'Lighting Enhancement',
            description: 'Add layered lighting with floor lamps and pendant lights to create a more inviting atmosphere.',
            icon: <Lightbulb className="text-emerald-400" />
          },
          {
            title: 'Color Recommendation',
            description: 'Introduce accent colors like teal or soft orange to add warmth to the neutral palette.',
            icon: <PaintBucket className="text-emerald-400" />
          },
          {
            title: 'Space Optimization',
            description: 'Consider multi-functional furniture pieces to maximize the space efficiency.',
            icon: <Maximize className="text-emerald-400" />
          },
          {
            title: 'Style Enhancement',
            description: 'Add textured elements like a plush rug or woven throw pillows to soften the minimalist aesthetic.',
            icon: <Palette className="text-emerald-400" />
          }
        ]
      });
    }, 3000);
  };

  return (
    <section id="room-analysis-details" className="py-24 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">Smart Room Analyzer</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-transparent"></span>
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Upload a photo of your room and receive AI-powered design recommendations based on the space, colors, and existing elements.
          </p>
        </div>
        
        <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex border-b border-gray-800">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 flex items-center justify-center ${
                activeTab === 'upload' 
                  ? 'text-emerald-400 border-b-2 border-emerald-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              <Camera size={18} className="mr-2" />
              Upload Room Photo
            </button>
            
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-300 flex items-center justify-center ${
                activeTab === 'results' 
                  ? 'text-emerald-400 border-b-2 border-emerald-500' 
                  : 'text-gray-400 hover:text-gray-300'
              } ${!results ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => results && setActiveTab('results')}
              disabled={!results}
            >
              <PanelRight size={18} className="mr-2" />
              Analysis Results
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'upload' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  {!image ? (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-12 cursor-pointer h-80 hover:border-emerald-500/50 transition-colors duration-300">
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleImageUpload}
                        accept="image/*" 
                      />
                      <Camera className="h-12 w-12 text-emerald-500 mb-4" />
                      <span className="text-gray-300 text-lg font-medium mb-2">Upload room photo</span>
                      <span className="text-gray-500 text-sm text-center">
                        Drop your image here, or click to browse
                      </span>
                    </label>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden h-80">
                      <img 
                        src={image} 
                        alt="Room" 
                        className="w-full h-full object-cover" 
                      />
                      <button 
                        onClick={() => setImage(null)}
                        className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-red-500/80 transition-colors duration-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button 
                      type="primary" 
                      className="w-full"
                      onClick={analyzeRoom}
                      disabled={!image || isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mr-2"></div>
                          Analyzing Room...
                        </>
                      ) : (
                        <>
                          <Scan size={18} className="mr-2" />
                          Analyze Room
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">How It Works</h3>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                        <span className="text-emerald-400 font-semibold">1</span>
                      </div>
                      <div>
                        <h4 className="text-gray-300 font-medium mb-1">Upload a photo</h4>
                        <p className="text-gray-500 text-sm">
                          Take a clear photo of your room from a corner angle that shows most of the space.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                        <span className="text-emerald-400 font-semibold">2</span>
                      </div>
                      <div>
                        <h4 className="text-gray-300 font-medium mb-1">AI analysis</h4>
                        <p className="text-gray-500 text-sm">
                          Our AI analyzes the room's dimensions, existing colors, furniture layout, and lighting conditions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                        <span className="text-emerald-400 font-semibold">3</span>
                      </div>
                      <div>
                        <h4 className="text-gray-300 font-medium mb-1">Get recommendations</h4>
                        <p className="text-gray-500 text-sm">
                          Receive personalized recommendations for improving your space based on design principles.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                        <span className="text-emerald-400 font-semibold">4</span>
                      </div>
                      <div>
                        <h4 className="text-gray-300 font-medium mb-1">Implement changes</h4>
                        <p className="text-gray-500 text-sm">
                          Apply the suggestions to transform your space with confidence in your design choices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="relative rounded-lg overflow-hidden h-64 mb-6">
                    <img 
                      src={image!} 
                      alt="Analyzed Room" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                        <span className="text-white font-medium">Analysis Complete</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Room Details</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Room Type:</span>
                        <span className="text-white">{results?.roomType}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white">{results?.roomSize}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">Colors:</span>
                        <span className="text-white">{results?.colorScheme}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">Style:</span>
                        <span className="text-white">{results?.style}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                    <Lightbulb className="text-emerald-400 mr-2" size={20} />
                    Design Recommendations
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results?.suggestions.map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-900 border border-gray-800 p-4 rounded-lg hover:border-emerald-500/40 transition-all duration-300"
                      >
                        <div className="flex items-start">
                          <div className="mt-1 mr-3">{suggestion.icon}</div>
                          <div>
                            <h4 className="text-gray-200 font-medium mb-1">{suggestion.title}</h4>
                            <p className="text-gray-400 text-sm">{suggestion.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button type="primary">
                      See Furniture Recommendations
                    </Button>
                    <Button type="outline">
                      View Color Palette
                    </Button>
                    <Button type="secondary">
                      Try Another Room
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomAnalyzerSection;