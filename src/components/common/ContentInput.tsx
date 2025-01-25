import React, { useRef, useCallback, useEffect } from "react";
import { Box, Typography, FormHelperText } from "@mui/material";
import { Controller, Control, FieldError } from "react-hook-form";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import ReactQuill from "react-quill-new";
import { Delta } from "quill";
import "react-quill-new/dist/quill.snow.css";

interface ContentInputProps {
  name?: string;
  control?: Control<any>;
  label?: string;
  error?: FieldError;
  initialContent?: Delta | null;
  onChange?: (value: any) => void;
  readOnly?: boolean;
}

const ContentInput: React.FC<ContentInputProps> = ({
  name = "",
  control,
  label,
  error,
  initialContent = null,
  onChange = () => {},
  readOnly = false,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];

        try {
          const url = await uploadToCloudinary(file);
          const quillInstance = quillRef.current?.getEditor();
          if (!quillInstance) {
            console.error("Quill editor is not initialized.");
            return;
          }
          const range = quillInstance.getSelection(true);
          if (range) {
            quillInstance.insertEmbed(range.index, "image", url);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (initialContent && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const currentContent = editor.getContents();

      // Delta 데이터 비교 후 필요할 때만 업데이트
      if (JSON.stringify(initialContent) !== JSON.stringify(currentContent)) {
        editor.setContents(initialContent);
      }
    }
  }, [initialContent]);

  const modules = readOnly
    ? undefined
    : {
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
          handlers: {
            image: handleImageUpload,
          },
        },
      };

  const handleTextChange = (
    content: string,
    delta: Delta,
    source: string,
    editor: any
  ) => {
    const deltaContent = editor.getContents();

    onChange(deltaContent);
  };

  const editorStyles = {
    border: readOnly ? "none" : "1px solid #ccc",
    borderRadius: 1,
    "& .ql-container": {
      border: "none",
      fontSize: "0.875rem",
      minHeight: "330px",
    },
    "& .ql-toolbar": readOnly
      ? { display: "none" }
      : { borderColor: error ? "error.main" : "grey.400" },
    "& .ql-container.ql-snow": {
      borderColor: "transparent",
    },
  };

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography
        component="label"
        sx={{
          display: "block",
          fontWeight: "bold",
          marginBottom: 1,
          color: error ? "error.main" : "text.primary",
        }}
      >
        {label}
      </Typography>
      {control ? (
        // React Hook Form을 사용하는 경우
        <Controller
          name={name || ""}
          control={control}
          render={({ field }) => (
            <Box sx={editorStyles}>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={modules}
                readOnly={readOnly}
                onChange={handleTextChange}
              />
            </Box>
          )}
        />
      ) : (
        // 읽기 전용 모드
        <Box sx={editorStyles}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={modules}
            readOnly={readOnly}
          />
        </Box>
      )}
      {error && (
        <FormHelperText sx={{ color: "error.main", marginTop: 1 }}>
          {error.message}
        </FormHelperText>
      )}
    </Box>
  );
};

export default ContentInput;
