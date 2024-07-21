import Editor from "@monaco-editor/react"

interface CodeProps {
    code: string;
}

const CodeRenderer = ({code}: CodeProps) => {

    return (

        <Editor 
            height="100vh"
            width="100%"
            language="clarity" 
            theme="vs-dark" 
            defaultValue={code}
            options={{
                fontSize: 14,
                minimap: {
                    enabled: false
                },
                contextmenu: false
            }}
        />

    )
}

export default CodeRenderer;