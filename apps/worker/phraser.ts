/*
    <boltArtifact>
        <boltAction type="shell">
            npm run start
        </boltAction>
        <boltAction type="file" filePath="src/index.js">
            console.log("Hello, world!");
        </boltAction>
    </boltArtifact>
*/
export interface phrase_response{
    data : string,
    type : 'CODE' | 'COMMAND' |'NONE',
    filepath ?: string,
}
export  class ArtifactProcessor {
     public currentArtifact : string;
     private onFileContent : (filePath : string, fileContent : string ) =>void ;
     private onShellCommand : (shellCommand : string) => void;


     constructor(currentArtifact : string , onFileContent : ( filePath : string, fileContent : string) => void , onShellCommand : (shellCommand : string) => void) {
        this.currentArtifact = currentArtifact,
        this.onFileContent = onFileContent,
        this.onShellCommand = onShellCommand
     }

     append(artifact : string ){
         this.currentArtifact += artifact;
     }

     async parse() : Promise<null| phrase_response> {
        // let  the phrase functin return an completely build object
        // Split once, operate on lines
        const lines = this.currentArtifact.split("\n");

        // Find the latest (last) boltAction start line
        let latestActionStart = -1;
        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i]?.includes("<boltAction type=")) {
                latestActionStart = i;
                break;
            }
        }

        if (latestActionStart === -1){ 
            return null;
        }

        // Find the first closing tag AFTER the start
        let latestActionEnd = -1;
        for (let i = latestActionStart + 1; i < lines.length; i++) {
            if (lines[i]?.includes("</boltAction>")) {
                latestActionEnd = i;
                break;
            }
        }
        if (latestActionEnd === -1) {
            // no closing tag yet; wait for more content
            return Promise.resolve(null);
        }

        // Extract attributes from the start line
        const actionLine = lines[latestActionStart];
        const typeMatch = actionLine?.match(/type="([^"]+)"/);
        const latestActionType = typeMatch ? typeMatch[1] : null;

        // Inner content (between start and end, excluding tag lines)
        const innerContent = lines.slice(latestActionStart + 1, latestActionEnd).join("\n");

        try{
            if (latestActionType === "shell"){
                const shellCommand = innerContent;
                this.currentArtifact = lines.slice(latestActionEnd + 1).join("\n");
                this.onShellCommand(shellCommand);
                return Promise.resolve({"type" : 'COMMAND',"data" : shellCommand})

            } else if (latestActionType === "file"){
                const filePathMatch = actionLine?.match(/filePath="([^"]+)"/);
                const filePath = filePathMatch ? filePathMatch[1] : "";
                const fileContent = innerContent;
                this.currentArtifact = lines.slice(latestActionEnd + 1).join("\n");
                this.onFileContent(filePath!, fileContent);

                return Promise.resolve({"type" : 'CODE',"data" : fileContent , "filepath" : filePath})
            }
        }catch(e){
            console.error(e)
        }

        return Promise.resolve(null)
     }
}
