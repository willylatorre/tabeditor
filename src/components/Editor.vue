<script>
import { debounce } from 'debounce'
import Icon from './Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  props: {
    tab: {
      type: Object,
      required: true
    }
  },
  components: {
    EditorContent,
    EditorMenuBar,
    Icon
  },
  data() {
    return {
      editor: null,
      buttons: [
        { name: 'bold', icon: 'bold' },
        { name: 'italic', icon: 'italic' },
        { name: 'strike', icon: 'strike' },
        { name: 'underline', icon: 'underline' },
        { name: 'code', icon: 'code' },
        { name: 'paragraph', icon: 'paragraph' },
        { name: 'bullet_list', icon: 'ul' },
        { name: 'ordered_list', icon: 'ol' },
        { name: 'blockquote', icon: 'quote' },
        { name: 'horizontal_rule', icon: 'hr' },
        { name: 'code_block', icon: 'code' }
      ]
    }
  },
  watch: {
    tab: {
      inmediate: true,
      deep: true,
      handler(tab) {
        // Only update if in the background (other open tabs)
        if (document.hidden) {
          this.editor.setContent(tab.content)
        }
      }
    }
  },
  mounted() {
    this.editor = new Editor({
      autoFocus: true,
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],

      content: this.tab.content
    })
    this.editor.on('update', ({ getHTML }) => {
      // get new content on update
      const newContent = getHTML()
      this.handleNewContent(newContent)
    })
  },
  methods: {
    handleNewContent: debounce(function(newContent) {
      this.$emit('content-update', newContent)
    }, 3000)
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          v-for="button in buttons"
          :key="button"
          :class="{ 'is-active': isActive[button.name]() }"
          @click="commands[button.name]"
        >
          <icon :name="button.icon" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button class="menubar__button" @click="commands.undo">
          <icon name="undo" />
        </button>

        <button class="menubar__button" @click="commands.redo">
          <icon name="redo" />
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>
