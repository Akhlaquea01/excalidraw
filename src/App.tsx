import { FC, useRef, useState } from 'react';
import {
  Excalidraw,
  exportToBlob,
  exportToCanvas,
  Sidebar,
} from '@excalidraw/excalidraw';

import './style.css';
// import { ExcalidrawProps } from '@excalidraw/excalidraw/types/types';

// type ExcalidrawImperativeAPI = Parameters<ExcalidrawProps['excalidrawAPI']>[0];

const initialData: any = {
  appState: { zenModeEnabled: false, viewBackgroundColor: '#F4EBD3' },
  scrollToContent: true,
};

export const App: FC<{ name: string }> = ({ name }) => {
  // const excalidraw = useRef<ExcalidrawImperativeAPI>();
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  // Remove canvasElement state and related code
  // const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
  const [docked, setDocked] = useState(false);

  // Helper to export .excalidraw file
  const handleExport = () => {
    if (!excalidrawAPI) return;
    const data = {
      type: 'excalidraw',
      version: 2,
      source: window.location.origin,
      elements: excalidrawAPI.getSceneElements(),
      appState: excalidrawAPI.getAppState(),
      files: excalidrawAPI.getFiles(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.excalidraw';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Helper to import .excalidraw file
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.elements && excalidrawAPI) {
          excalidrawAPI.updateScene({
            elements: json.elements,
            appState: json.appState,
            files: json.files,
          });
        }
      } catch (err) {
        alert('Invalid Excalidraw file.');
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be re-imported
    event.target.value = '';
  };

  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom menu item for import
  const menuCustomItems = [
    {
      label: 'Import File',
      action: () => fileInputRef.current?.click(),
      icon: undefined, // You can add a custom icon if desired
    },
  ];
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Excalidraw Example</h1>
      {/* Hidden file input for import, triggered from menu */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".excalidraw,application/json"
        style={{ display: 'none' }}
        onChange={handleImport}
      />
      {/* Remove Export to Canvas button */}
      {/* <button
        onClick={async () => {
          if (!excalidrawAPI) return;
          const elements = excalidrawAPI.getSceneElements();
          if (!elements || !elements.length) {
            return;
          }
          const canvas = await exportToCanvas({
            elements,
            appState: {
              ...initialData.appState,
              exportWithDarkMode: false,
            },
            files: excalidrawAPI.getFiles(),
          });
          setCanvasElement(canvas);
        }}
      >
        Export to Canvas
      </button> */}
      <div style={{ height: '500px' }}>
        <Excalidraw
          name={'hellooooo'}
          UIOptions={{
            tools: {
              image: false,
            },
            canvasActions: {
              saveAsImage: false,
              changeViewBackgroundColor: false,
            },
            menu: {
              customItems: menuCustomItems,
            },
          }}
          excalidrawAPI={setExcalidrawAPI}
          initialData={initialData}
          onChange={(data) => {
            console.log(data);
          }}
        >
          <Sidebar name="custom" docked={docked} onDock={setDocked}>
            <Sidebar.Header />
            <Sidebar.Tabs style={{ padding: '0.5rem' }}>
              <Sidebar.Tab tab="one">Tab one!</Sidebar.Tab>
              <Sidebar.Tab tab="two">Tab two!</Sidebar.Tab>
              <Sidebar.TabTriggers>
                <Sidebar.TabTrigger tab="one">One</Sidebar.TabTrigger>
                <Sidebar.TabTrigger tab="two">Two</Sidebar.TabTrigger>
              </Sidebar.TabTriggers>
            </Sidebar.Tabs>
          </Sidebar>
        </Excalidraw>

      </div>
    </>
  );
};
