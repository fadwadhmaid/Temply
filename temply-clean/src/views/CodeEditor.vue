<template>
  <div ref="editorContainer" class="h-[300px] border rounded-xl overflow-auto"></div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "@codemirror/basic-setup";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

const props = defineProps({
  code: { type: String, default: "" },
  language: { type: String, default: "html" }, // 'html' ou 'css'
  darkMode: { type: Boolean, default: false },
});

const editorContainer = ref(null);
let view;

// Fonction pour créer le thème
const getTheme = (dark) => EditorView.theme({
  "&": {
    backgroundColor: dark ? "#1E293B" : "#fff",
    color: dark ? "#f0f0f0" : "#111",
    height: "100%",
  },
  ".cm-content": {
    fontFamily: "monospace",
    fontSize: "14px",
  },
});

onMounted(() => {
  view = new EditorView({
    state: EditorState.create({
      doc: props.code,
      extensions: [
        basicSetup,
        props.language === "html" ? html() : css(),
        getTheme(props.darkMode),
        EditorView.editable.of(false), // lecture seule
      ],
    }),
    parent: editorContainer.value,
  });
});

// Mettre à jour le contenu si props.code change
watch(
  () => props.code,
  (newCode) => {
    if (view && newCode != null) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: newCode },
      });
    }
  },
  { immediate: true } // initialise le code dès le montage
);

// Mettre à jour le thème si darkMode change
watch(
  () => props.darkMode,
  (isDark) => {
    if (view) {
      view.dispatch({
        effects: EditorView.reconfigure([basicSetup, props.language === "html" ? html() : css(), getTheme(isDark), EditorView.editable.of(false)])
      });
    }
  }
);
</script>
