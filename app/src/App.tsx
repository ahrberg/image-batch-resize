import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import OptionButton from "./components/OptionButton";
import Paper from "./components/Paper";
import Button from "./components/Button";
import TextInput from "./components/TextInput";
import Section from "./components/Section";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Info from "./components/Info";
import Progress from "./components/Progress";
import ButtonGroup from "./components/ButtonGroup";
import { Small, Medium, Large, AcceptedFileTypes } from "./config";
import { resizeAndArchive } from "./utils";
import { FileType, OutputOption, SizeOption } from "./types";

import "./App.css";

function App() {
  // App states
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<OutputOption>({ sizes: [] });
  const [customSize, setCustomSize] = useState<string>("");
  const [showInfo, setShowInfo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  const handleOnDrop = useCallback(async (acceptedFiles: File[]) => {
    const haveAcceptedFileType = acceptedFiles.filter((f) =>
      AcceptedFileTypes.includes(f.type)
    );
    setFiles((files) => [...files, ...haveAcceptedFileType]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleOnDrop,
  });

  const handleProgress = (percent: number) => {
    setProgress(percent);
  };

  const handleResize = async () => {
    if (files.length && options.sizes.length) {
      setRunning(true);
      try {
        await resizeAndArchive(files, options, handleProgress);
      } catch (error) {
        console.error("Error in handle resize", error);
      } finally {
        setRunning(false);
        setProgress(0);
      }
    }
  };

  const handleOptionChanged = (option: SizeOption) => {
    setOptions((o) => {
      if (o.sizes.find((f) => f.maxSize === option.maxSize)) {
        return {
          ...o,
          sizes: o.sizes.filter((s) => s.maxSize !== option.maxSize),
        };
      } else {
        return { ...o, sizes: [...o.sizes, option] };
      }
    });
  };

  const handleReset = () => {
    setFiles([]);
  };

  const handleCustomSizeChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const sizeInput = event.target.value;
    const size = (sizeInput.match("[0-9]*") || []).join("");
    setCustomSize(size);
    setOptions((o) => {
      const newOptions = {
        ...o,
        sizes: [...o.sizes.filter((f) => !f.custom)],
      };

      if (size) {
        newOptions.sizes.push({
          fileNameSiffix: `_${size}`,
          maxSize: parseInt(size),
          custom: true,
        });
      }
      return newOptions;
    });
  };

  const handleFileTypeChanged = (type: string | undefined) => {
    setOptions((o) => ({ ...o, fileType: type as FileType | undefined }));
  };

  return (
    <div className="App-content">
      <Paper>
        {running && <Progress percent={progress} />}
        <Info show={showInfo} onClose={() => setShowInfo(false)} />
        <header>
          <Header count={files.length} onReset={handleReset} />
        </header>
        <section>
          <h1 className="App-h1">Image batch resize</h1>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="App-info">
              <div>
                <Button size="wide" color="primary" text="Select images" />
              </div>
              {isDragActive ? <p>Drop!</p> : <p>or drop them here...</p>}
            </div>
          </div>
          <Section title="Sizes *">
            <div className="InlineGroup App-space-buttons">
              <OptionButton
                onChange={handleOptionChanged}
                option={Small}
                text="Small"
                selected={
                  options.sizes.find((o) => o.maxSize === Small.maxSize)
                    ? true
                    : false
                }
              />
              <OptionButton
                onChange={handleOptionChanged}
                option={Medium}
                text="Medium"
                selected={
                  options.sizes.find((o) => o.maxSize === Medium.maxSize)
                    ? true
                    : false
                }
              />
              <OptionButton
                onChange={handleOptionChanged}
                option={Large}
                text="Large"
                selected={
                  options.sizes.find((o) => o.maxSize === Large.maxSize)
                    ? true
                    : false
                }
              />
              <TextInput
                onChange={handleCustomSizeChanged}
                value={customSize}
                color="secondary"
              />
            </div>
          </Section>
          <Section title="File type">
            <div className="InlineGroup App-space-buttons">
              <ButtonGroup
                items={[
                  { id: FileType.WEBP, text: "WebP" },
                  { id: FileType.JPEG, text: "Jpeg" },
                  { id: FileType.PNG, text: "Png" },
                ]}
                selectedChanged={handleFileTypeChanged}
                selectedId={options.fileType}
              />
            </div>
          </Section>
          <div className="App-submit">
            <Button
              text="Resize"
              size="wide"
              disabled={running}
              variant="solid"
              onClick={handleResize}
              color="primary"
            />
          </div>
        </section>
        <footer>
          <Footer onShowInfo={() => setShowInfo(true)} />
        </footer>
      </Paper>
    </div>
  );
}

export default App;
