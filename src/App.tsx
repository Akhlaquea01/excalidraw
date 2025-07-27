import { FC, useRef, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import './style.css';


const initialData: any = {
  appState: { zenModeEnabled: false, viewBackgroundColor: '#F4EBD3' },
  scrollToContent: true,
};

export const App: FC = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const menuCustomItems = [
    {
      label: 'Import File',
      action: () => fileInputRef.current?.click(),
    },
  ];
  return (
    <div>
        <Excalidraw
          UIOptions={{
            tools: {
              image: true,
            },
            canvasActions: {
              export: {
                saveFileToDisk: true,
              },
              loadScene: true,
              saveToActiveFile: true,
              theme: true,
              clearCanvas: true,
              changeViewBackgroundColor: true,
            },
            menu: {
              fileHandle: true,
              customItems: menuCustomItems,
            },
          }}
          excalidrawAPI={setExcalidrawAPI}
          initialData={initialData}
          onChange={(data) => {
            console.log(data);
          }}
        />


    </div>
  );
};
