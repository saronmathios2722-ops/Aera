"use client";

import { motion } from "framer-motion";
import { X, Upload, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

interface WardrobeUploadProps {
  onClose: () => void;
}

export default function WardrobeUpload({ onClose }: WardrobeUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    // Simulate uploading each file
    for (const file of files) {
      setUploadingFiles(prev => [...prev, file.name]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUploadingFiles(prev => prev.filter(name => name !== file.name));
      setCompletedItems(prev => [...prev, file.name]);
    }
    setIsSuccess(true);
    setTimeout(onClose, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-aureve-charcoal/20 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-xl"
      >
        <GlassCard className="relative p-12 !rounded-[2.5rem] bg-white">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-aureve-taupe hover:text-aureve-charcoal transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center space-y-8">
            {!isSuccess ? (
              <>
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl text-aureve-charcoal">Add to Sanctuary</h3>
                  <p className="text-sm text-aureve-taupe uppercase tracking-widest">AI Categorization Active</p>
                </div>

                <div className="space-y-6">
                  <div 
                    className={`border-2 border-dashed rounded-[2rem] p-12 transition-all cursor-pointer flex flex-col items-center gap-4 ${
                      isUploading ? "border-aureve-gold bg-aureve-gold/5" : "border-aureve-gray hover:border-aureve-gold"
                    }`}
                    onClick={() => !isUploading && document.getElementById('file-upload')?.click()}
                  >
                    <input 
                      id="file-upload" 
                      type="file" 
                      multiple 
                      className="hidden" 
                      onChange={onFileChange}
                    />
                    
                    <div className="h-16 w-16 rounded-full bg-aureve-cream flex items-center justify-center text-aureve-gold">
                      <Upload className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-aureve-charcoal font-medium">Click to select multiple images</p>
                      <p className="text-aureve-taupe text-xs mt-1">Or drag and drop your outfit photos</p>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-3 text-left max-h-48 overflow-y-auto pr-2 no-scrollbar">
                      {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-aureve-cream/30 rounded-2xl border border-aureve-gray/20">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-white border border-aureve-gray/30 flex items-center justify-center overflow-hidden">
                              <Loader2 className={`h-5 w-5 text-aureve-gold ${uploadingFiles.includes(file.name) ? "animate-spin" : ""}`} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-aureve-charcoal truncate max-w-[150px]">{file.name}</p>
                              <p className="text-[10px] text-aureve-taupe uppercase tracking-tighter">
                                {uploadingFiles.includes(file.name) ? "Analyzing..." : completedItems.includes(file.name) ? "Processed" : "Pending"}
                              </p>
                            </div>
                          </div>
                          {!isUploading && (
                            <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}>
                              <X className="h-4 w-4 text-aureve-taupe hover:text-red-400" />
                            </button>
                          )}
                          {completedItems.includes(file.name) && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {files.length > 0 && !isSuccess && (
                    <button
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="w-full bg-aureve-charcoal text-white py-4 rounded-full font-medium tracking-wide shadow-floating hover:bg-aureve-gold transition-all disabled:opacity-50"
                    >
                      {isUploading ? "Sanctuary Processing..." : `Upload ${files.length} Item${files.length > 1 ? 's' : ''}`}
                    </button>
                  )}
                </div>

                <div className="pt-4">
                   <p className="text-[10px] uppercase tracking-widest text-aureve-taupe leading-relaxed">
                     Our AI automatically removes backgrounds and identifies fabrics, colors, and cuts.
                   </p>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 space-y-6"
              >
                <div className="h-20 w-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                   <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="font-serif text-3xl text-aureve-charcoal">Items Identified</h3>
                <p className="text-aureve-taupe">We've added your new pieces to your digital wardrobe sanctuary.</p>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
