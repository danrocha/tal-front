<template>
  <div class="editor border rounded border-gray-400 bg-white">
    <editor-menu-bar :editor="editor" class="border-b border-grey-400">
      <div class="bg-white py-2" slot-scope="{ commands, isActive }">
        <button
          aria-label="bold"
          class="btn-editor"
          :class="{ active: isActive.bold() }"
          @click.prevent="commands.bold"
        >
          <font-awesome-icon icon="bold"></font-awesome-icon>
        </button>
        <button
          aria-label="italic"
          class="btn-editor"
          :class="{ active: isActive.italic() }"
          @click.prevent="commands.italic"
        >
          <font-awesome-icon icon="italic"></font-awesome-icon>
        </button>
        <button
          aria-label="underline"
          class="btn-editor"
          :class="{ active: isActive.underline() }"
          @click.prevent="commands.underline"
        >
          <font-awesome-icon icon="underline"></font-awesome-icon>
        </button>
        <button
          aria-label="strikethrough"
          class="btn-editor"
          :class="{ active: isActive.strike() }"
          @click.prevent="commands.strike"
        >
          <font-awesome-icon icon="strikethrough"></font-awesome-icon>
        </button>
        <span class="border-l"></span>
        <button
          aria-label="bullet list"
          class="btn-editor"
          :class="{ active: isActive.bullet_list() }"
          @click.prevent="commands.bullet_list"
        >
          <font-awesome-icon icon="list-ul"></font-awesome-icon>
        </button>
        <button
          aria-label="ordered-list"
          class="btn-editor"
          :class="{ active: isActive.ordered_list() }"
          @click.prevent="commands.ordered_list"
        >
          <font-awesome-icon icon="list-ol"></font-awesome-icon>
        </button>
        <span class="border-l"></span>
        <button aria-label="undo" class="btn-editor" @click.prevent="commands.undo">
          <font-awesome-icon icon="undo-alt"></font-awesome-icon>
        </button>
        <button aria-label="redo" class="btn-editor" @click.prevent="commands.redo">
          <font-awesome-icon icon="redo-alt"></font-awesome-icon>
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="m-2" :editor="editor" :content="value"/>
  </div>
</template>

<script>
// Import the editor
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new BulletList(),
        new ListItem(),
        new OrderedList(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      content: this.value,
      onUpdate: ({ getHTML }) => {
        this.$emit('input', getHTML());
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style scoped>
.editor {
  min-height: 12em;
}
.btn-editor {
  @apply py-1 px-2 mx-1 rounded text-xs;
}
.btn-editor:hover {
  @apply bg-gray-300;
}
.active {
  @apply bg-gray-400;
}
</style>
