import Header from "@editorjs/header";
import List from "@editorjs/link";
import Embed from "@editorjs/embed";
import Table from '@editorjs/table';
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Checklist from "@editorjs/checklist";
import InlineCode from '@editorjs/inline-code';
import CodeTool from "@calumk/editorjs-codeflask";
import ImageTool from '@editorjs/image';
const Configuration = () => {
  console.log(Header);
  return {
    /**
     * Id of Element that should contain Editor instance
     */
    holder: "editorjs",
    autofocus: true,

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    // tools: {
    //   header: {
    //     class: Header,
    //     inlinetoolbar: ["link"],
    //     list: {
    //       class: List,
    //       inlinetoolbar: ["link", "bold", "italic","marker","underline"],
    //     },
    //     embed: {
    //       class: Embed,
    //       inlinetoolbar: true,
    //       config: {
    //         services: {
    //           youtube: true,
    //           coub: true,
    //         },
    //       },
    //     },
    //   },
    // },
    tools: {
      /**
       * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
       */
      header: {
        class: Header,
        inlineToolbar: ["marker", "link"],
        config: {
          placeholder: "Header",
        },
        shortcut: "CMD+SHIFT+H",
      },

      /**
       * Or pass class directly without any configuration
       */
      image: ImageTool,

      list: {
        class: List,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+L",
      },

      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },

      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: "Enter a quote",
          captionPlaceholder: "Quote's author",
        },
        shortcut: "CMD+SHIFT+O",
      },
      embed: {
        class: Embed,
        inlinetoolbar: true,
        config: {
          services: {
            youtube: true,
            coub: true,
          },
        },
      },
    //   warning: Warning,

      marker: {
        class: Marker,
        shortcut: "CMD+SHIFT+M",
      },

      code: {
        class: CodeTool,
        shortcut: "CMD+SHIFT+C",
      },

      inlineCode: {
        class: InlineCode,
        shortcut: "CMD+SHIFT+I",
      },

    //   linkTool: LinkTool,

      table: {
        class: Table,
        inlineToolbar: true,
        shortcut: "CMD+ALT+T",
      },
    },
    /**
     * Previously saved data that should be rendered
     */
    onReady: () => {
      console.log("Editor.js is ready to work!");
    },
    onChange: (api, event) => {
      console.log("Now I know that Editor's content changed!", event);
    },
    data: {
      "time": 1676021988860,
      "blocks": [
          {
              "id": "VYjeIi9njD",
              "type": "header",
              "data": {
                  "text": "Heading Goes here",
                  "level": 2
              }
          }
      ],
      "version": "2.26.5"
  }
  };
};

export default Configuration;
