<template>
  <!-- Main container -->
  <div class="container py-4">
    <h2>Basic planning</h2>
    <button type="button" class="btn btn-light" v-on:click="newModel">New</button>
    <button type="button" class="btn btn-light" v-on:click="saveModel">Save</button>
    <!-- <button type="button" class="btn btn-light" v-on:click="loadModel">Load</button> -->
    <select class="form-select" aria-label="Default select example" v-model="selectedModel" v-on:change="changeModel">
      <option disabled value="" selected>Please select one</option>
      <option v-for="option in models" v-bind:value="option">
        {{ option.name }}
      </option>
    </select>
    <div>
      <ejs-toolbar id='toolbar' style="width:100%; height: 10%; margin-top: 10px;"
        :clicked='toolbarclicked'
        :items='toolbaritems'>
      </ejs-toolbar>
    </div>
    <div class="row">
      <div class="col-lg-12 control-section">
        <div id="diagramEventsControlSection" class="content-wrapper" style="width:100%;background: white">
          <div id="diagram-space" class="sb-mobile-diagram">
            <ejs-diagram 
              ref="diagramControl" 
              id="diagram" 
              :width='width'
              :height='height'
              :contextMenuSettings="contextMenu" 
              :snapSettings='snapSettings'
              :click="click" 
              :doubleClick="doubleClick" 
            >
            </ejs-diagram>
          </div>
          
          <div id="palette-space" class="sb-mobile-palette">
            <ejs-symbolpalette 
              id="symbolpalette" 
              :expandMode='expandMode' 
              :palettes='palettes' 
              :width='palettewidth' 
              :height='paletteheight'  
              :getSymbolInfo='getSymbolInfo' 
              :symbolMargin='symbolMargin' 
              :symbolHeight='symbolHeight' 
              :symbolWidth='symbolWidth' 
              :getNodeDefaults='palettegetNodeDefaults' 
              :paletteExpanding='paletteExpanding'
            >
            </ejs-symbolpalette>
          </div>
        </div>
      </div>
    </div>
    <div id="upload-container">
      <ejs-uploader id="fileupload" name="UploadFiles"       
        :asyncSettings='fileuploadasyncSettings'
        :success='fileuploadsuccess'
        :showFileList ='showFile'/>
    </div>

    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Open modal
    </button> -->

    <!-- <button type="button" class="btn btn-primary" v-on:click="openModal">
      Open modal
    </button>  -->

    <div class="modal fade" id="exampleModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Entity</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" placeholder="Enter text" v-model="shapeText" />
            <p>You've written: </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="saveShape">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Uploader, UploaderPlugin } from "@syncfusion/ej2-vue-inputs";
import {
  DiagramPlugin,
  SymbolPalettePlugin,
  Diagram, DiagramContextMenu,
  DiagramConstraints
} from "@syncfusion/ej2-vue-diagrams";
import {
  ToolbarPlugin,
  Toolbar
} from "@syncfusion/ej2-vue-navigations";
import { ListViewPlugin, ListView } from "@syncfusion/ej2-vue-lists";
import { ButtonPlugin } from "@syncfusion/ej2-vue-buttons";
import states from "../data.json";

Vue.use(DiagramPlugin);
Vue.use(SymbolPalettePlugin);
Vue.use(ListViewPlugin);
Vue.use(ButtonPlugin);
Vue.use(ToolbarPlugin);
Vue.use(UploaderPlugin);

let diagramInstance;

let basicShapes = [
  { id: 'Rectangle Box', shape: { type: 'Basic', shape: 'Rectangle' } },
  { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } }, 
  { id: 'Text', shape: { type: 'Basic', shape: 'Text' }, annotations: [{content: 'Text'}] },
  { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
  { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
  { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
  { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
  { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
  { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' } },
  { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' } },
  { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' } },
  { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' } },
  { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' } },
  { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' } },
  { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' } },
  { id: 'Star', shape: { type: 'Basic', shape: 'Star' } }
];

export default {
  name: "Home",
  data() {
    return {
      // modalTitle: '',
      nodeId: '',
      shapeText: '',
      selectedModel: '',
      shapes: [],
      models: [],
      //Initializes diagram control
      width: "100%",
      height: 700,
      snapSettings: { constraints: 0 },
      contextMenu: { show: true },

      //diagram events
      click: (args) => {
        if (args.actualObject !== undefined) {
          console.log('click on Node');
          // Name of the node
          // const nodeName = args.element.properties.annotations[0].properties.content;
          // console.log(nodeName);
          // this.modalTitle = nodeName;
          // Id of the node
          console.log(args.element.properties.id);
          this.nodeId = args.element.properties.id;
          // this.models.forEach(item => { 
          //   // const text = item.nodes.find(x => x.id === this.nodeId);
          //   console.log(item.nodes);
          // });
          const node = this.shapes.find(item => item.id === this.nodeId);
          // console.log(node);
          node !== undefined ? this.shapeText = node.text : this.shapeText = '';
          // console.log(this.shapes);
          // this.shapes.length ? 
          //   this.shapeText = this.shapes.find(item => item.id === this.nodeId).text
          //   : this.shapeText = ''
        } else {
          console.log('Click on Diagram');
        }
        console.log(args);
      },
      doubleClick: (args) => {
        this.openModal();
      },
    
      // Initialize palette
      expandMode: "Multiple",
      palettes: [
        {
          id: "basic",
          expanded: true,
          symbols: basicShapes,
          iconCss: "shapes",
          title: "Items"
        }
      ],
      palettewidth: "100%",
      // palettewidth: "300px",
      paletteheight: "700px",
      palettegetNodeDefaults: (symbol) => {
        symbol.style = {strokeColor: "#757575"}
      },
      // symbolHeight: 60,
      // symbolWidth: 60,
      symbolHeight: 100,
      symbolWidth: 120,
      symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
      // getSymbolInfo: (symbol) => {
      //   return { fit: true };
      // },
      // display texts in the palette
      getSymbolInfo: (symbol) => {
        if (symbol.text !== undefined) {
          return { description: { text: symbol.text, overflow: 'Wrap' }};
        }
        return { description: { text: symbol.id }};
      },
      toolbarclicked: (args) => {
        if (args.item.text === "New") {
          diagramInstance.clear();
        } else if (args.item.text === "Load") {
          let element = document.getElementsByClassName(
            "e-file-select-wrap"
          );
          let htmlButtonElement = element[0].querySelector(
            "button"
          );
          htmlButtonElement.click();
        } else if (args.item.id === 'palette-icon') {
          openPalette();
        } else {
          download(diagramInstance.saveDiagram());
        }
      },
      toolbaritems: [
        { text: "New", tooltipText: "New", },
        {
          type: "Separator"
        },
        {
          text: "Save",
          tooltipText: "Save",
        },
        {
          type: "Separator"
        },
        {
          text: "Load",
          tooltipText: "Load"
        }
      ],
      fileuploadasyncSettings: {
        saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
        removeUrl:
          "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove"
      },
      fileuploadsuccess: onUploadSuccess,
      showFile: true
    };
  },
  provide: {
    diagram: [DiagramContextMenu]
  },
  mounted() {
    diagramInstance = this.$refs.diagramControl.ej2Instances;
    // diagramInstance.fitToPage();
    // console.log(diagramInstance);
    this.models = states;
    console.log(this.models);
  },
  computed: {

  },
  methods: {
    openModal () {
      $('#exampleModal').modal('show');
    },

    paletteExpanding: (args) => {
      // prevent collapse
      args.cancel = true;
    },

    newModel () {
      diagramInstance.clear();
    },

    changeModel () {
      console.log(this.selectedModel);
      let diagram = document.getElementById('diagram');
      diagram = diagram.ej2_instances[0];
      diagram.loadDiagram(JSON.stringify(this.selectedModel));
    },

    // loadModel (event) {
    //   let diagram = document.getElementById('diagram');
    //   diagram = diagram.ej2_instances[0];
    //   diagram.loadDiagram(JSON.stringify(this.models));
    //   console.log(this.models);
    // },

    saveShape () {
      const index = this.shapes.findIndex(item => item.id === this.nodeId);
      if (index === -1 ) {
        this.shapes.push({
          id: this.nodeId,
          text: this.shapeText
        });
      } else {
        this.shapes[index].text = this.shapeText;
      }
      console.log(this.shapes);
    },
    
    saveModel () {
      let diagram = document.getElementById('diagram');
      diagram = diagram.ej2_instances[0];
      const data = diagram.saveDiagram();
      // console.log(JSON.parse(data));
      const savedData = JSON.parse(data);
      // const node = savedData.nodes.find(item => item.id === this.nodeId);
      // node.entityText = this.shapeText;
      console.log(savedData);
      // console.log(node);
      // const nodeIndex = savedData.nodes.findIndex(item => item.id === this.nodeId);
      // const shapeIndex = this.shapes.findIndex(item => item.id === this.nodeId);
      // savedData.nodes[nodeIndex].entityText = this.shapes[shapeIndex].text;
      this.shapes.forEach(item => {
        const node = savedData.nodes.filter(v => v.id === item.id);
        // console.log(node);
        
        if (node.length) {
          node[0].entityText = item.text;
        }
      });
      this.models.push(savedData);
      // console.log(this.models);
      // console.log('click');
    }
  },
};

//save the diagram object in json data.
function download(data) {
  let dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(data);
  let a = document.createElement("a");
  a.href = dataStr;
  a.download = "Diagram.json";
  document.body.appendChild(a);
  a.click();
}

function onUploadSuccess(args) {
  let file1  = args.file;
  let file= file1.rawFile;
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onloadend = loadDiagram;
}

//Load the diagraming object.
function loadDiagram(event) {
  diagramInstance.loadDiagram((event.target).result);
}

</script>


<style scoped>
.e-file-select-wrap {
  display: none;
}
#upload-container  {
  display: none;
}
.control-section {
  padding-top: 0px;
  padding-right: 0px;
}
.sb-mobile-palette {
  width: 188px;
  height: 100%;
  float: left;
}

.sb-mobile-palette-bar {
  display: none;
}

.sb-mobile-diagram {
  width: calc(100% - 200px);
  height: 100%;
  float: left;
  border: 1px solid #d9dedd;
}

@media (max-width: 550px) {
  #diagramEventsControlSection .sb-mobile-palette {
    z-index: 19;
    position: absolute;
    /* display: none; */
    transition: transform 300ms linear, visibility 0s linear 300ms;
    width: 39%;
    height: 100%;
    /* keeping this palette in the right position */
    right: 0;
  }

  #diagramEventsControlSection .sb-mobile-diagram {
    width: 100%;
    height: 100%;
    float: left;
    left: 0px;
  }
}
</style>

<style>
/** Overriding some default styling for specific id */
#symbolpalette_container.e-accordion .e-acrdn-item .e-acrdn-header .e-toggle-icon {
  /* Removing collapse button from symbolpalette */
  display: none;
}
#diagramEventsControlSection tspan {
  /* Hiding node name on diagram-space */
  /* display: none; */
}
text[id*='Rectangle'],
text[id*='Ellipse'],
text[id*='Parallelogram'],
text[id*='Triangle'],
text[id*='Hexagon'],
text[id*='Pentagon'],
text[id*='Cylinder'],
text[id*='Plus'],
text[id*='Heptagon'],
text[id*='Octagon'],
text[id*='Trapezoid'],
text[id*='Decagon'],
text[id*='RightTriangle'],
text[id*='Diamond'],
text[id*='Star']  {
  /* display: none;  */
}
#symbolpalette_container.e-accordion .e-acrdn-item.e-select>.e-acrdn-header {
  /* changed cursor on symbolpalette as there is no events now */
  cursor: default;
}
#symbolpalette_container.e-accordion .e-acrdn-item.e-selected>.e-acrdn-header:focus {
  /* removing box shadow from symbolpalette */
  box-shadow: none;
}
</style>
