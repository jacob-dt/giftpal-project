import LiveblocksProvider from "@liveblocks/yjs";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { StarterKit } from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { Doc } from "yjs";
import { Placeholder } from "@tiptap/extension-placeholder";
import { useSelf } from "@/app/liveblocks.config";

type EditSectionProps = {
    doc: Doc;
    provider: LiveblocksProvider<any, any, any, any>;
    giftId: string;
};

export default function GiftPurchaseEditSection({
    doc,
    provider,
    giftId,
}: EditSectionProps) {
    const userInformation = useSelf((user) => user.info);

    if (!userInformation) {
        return;
    }

    const editorObject = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            Placeholder.configure({
                emptyEditorClass: "is-editor-empty",
                placeholder: "Enter Purchase Link Here",
            }),
            Collaboration.configure({
                document: doc,
                field: giftId,
            }),
            CollaborationCursor.configure({
                provider,
                user: userInformation,
            }),
        ],
    });

    return <EditorContent editor={editorObject} />;
}
