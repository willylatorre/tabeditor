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
    }
  },
  computed: {
    buttons() {
      return [
        { name: 'bold', icon: `bold${this.isDark ? '-dark' : ''}` },
        { name: 'italic', icon: `italic${this.isDark ? '-dark' : ''}` },
        { name: 'strike', icon: `strike${this.isDark ? '-dark' : ''}` },
        { name: 'underline', icon: `underline${this.isDark ? '-dark' : ''}` },
        { name: 'code', icon: `code${this.isDark ? '-dark' : ''}` },
        { name: 'paragraph', icon: `paragraph${this.isDark ? '-dark' : ''}` },
        { name: 'bullet_list', icon: `ul${this.isDark ? '-dark' : ''}` },
        { name: 'ordered_list', icon: `ol${this.isDark ? '-dark' : ''}` },
        { name: 'blockquote', icon: `quote${this.isDark ? '-dark' : ''}` },
        { name: 'horizontal_rule', icon: `hr${this.isDark ? '-dark' : ''}` },
        { name: 'code_block', icon: `code${this.isDark ? '-dark' : ''}` }
      ]
    },
    isDark() {
      return window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
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
          :key="button.name"
          :class="{ 'is-active': isActive[button.name]() }"
          @click="commands[button.name]()"
        >
          <icon :name="button.icon" />
        </button>

        <button
          class="menubar__button text-primary dark:text-primaryDark"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button text-primary dark:text-primaryDark"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button text-primary dark:text-primaryDark"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button class="menubar__button" @click="commands.undo">
          <icon :name="`undo${isDark ? '-dark': ''}`" />
        </button>

        <button class="menubar__button" @click="commands.redo">
          <icon :name="`redo${isDark ? '-dark': ''}`" />
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>
