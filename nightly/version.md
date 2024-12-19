commit 8e100d45d1591f4683a2b7ea80c30e67dc58016c
Author: Stoyan <88034608+hinzzx@users.noreply.github.com>
Date:   Wed Dec 18 17:12:26 2024 +0200

    fix(ui5-file-uploader): use optional chain in onclick check (#10408)
    
    Previously when there wasn't any slotted element in the <ui5-file-uploader> an error was thrown on click in the console.
    
    The reason behind this is because of the getFocusDomRef().
    The getter tries to access the first slotted element in the FileUploader resulting in undefined when such is missing, while in the if () statement there was a non-nullish assertion (!)
