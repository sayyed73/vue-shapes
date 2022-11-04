<template>
  <!-- Main container -->
  <div class="container py-4">
    <h2>Basic planning</h2>
    <div class="row">
      <div class="col-lg-8 control-section">
        <div id="diagramEventsControlSection" class="content-wrapper" style="width:100%;background: white">
          <div id="diagram-space" class="sb-mobile-diagram">
            <ejs-diagram 
              ref="diagramControl" 
              id="diagram" 
              width="100%" 
              height="700px" 
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
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal body for {{ modalTitle }} text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  DiagramPlugin,
  SymbolPalettePlugin,
  Diagram, DiagramContextMenu,
  DiagramConstraints
} from "@syncfusion/ej2-vue-diagrams";
import { ListViewPlugin, ListView } from "@syncfusion/ej2-vue-lists";
import { ButtonPlugin } from "@syncfusion/ej2-vue-buttons";

Vue.use(DiagramPlugin);
Vue.use(SymbolPalettePlugin);
Vue.use(ListViewPlugin);
Vue.use(ButtonPlugin);

let diagramInstance;

let basicShapes = [
  { id: 'Rectangle Box', shape: { type: 'Basic', shape: 'Rectangle' }, annotations: [{content: 'Rectangle Box'}] },
  { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' }, annotations: [{content: 'Ellipse'}] },
  { id: 'Text', shape: { type: 'Basic', shape: 'Text' }, annotations: [{content: 'Text'}] },
  { id: 'Sync Logo', width: 100, height: 100, shape: { type: 'Image', source: 'https://www.syncfusion.com/content/images/nuget/sync_logo_icon.png', scale: 'None' }, annotations: [{content: 'Sync Logo'}] },
  { id: 'Chair', width: 100, height: 100, shape: { type: 'Image', source: require('~/assets/images/chair.png'), scale: 'None' }, annotations: [{content: 'Chair'}] },
  { id: 'Table', width: 100, height: 100, shape: { type: 'Image', source: require('~/assets/images/table.png'), scale: 'None' }, annotations: [{content: 'Table'}] },
  { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' }, annotations: [{content: 'Parallelogram'}] },
  { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' }, annotations: [{content: 'Triangle'}] },
  { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' }, annotations: [{content: 'Hexagon'}] },
  { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' }, annotations: [{content: 'Pentagon'}] },
  { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' }, annotations: [{content: 'Cylinder'}] },
  { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' }, annotations: [{content: 'Plus'}] },
  { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' }, annotations: [{content: 'Heptagon'}] },
  { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' }, annotations: [{content: 'Octagon'}] },
  { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' }, annotations: [{content: 'Trapezoid'}] },
  { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' }, annotations: [{content: 'Decagon'}] },
  { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' }, annotations: [{content: 'RightTriangle'}] },
  { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' }, annotations: [{content: 'Diamond'}] },
  { id: 'Star', shape: { type: 'Basic', shape: 'Star' }, annotations: [{content: 'Star'}] }
];

export default {
  name: "Home",
  data() {
    return {
      modalTitle: '',
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
          const nodeName = args.element.properties.annotations[0].properties.content;
          console.log(nodeName);
          this.modalTitle = nodeName;
          // Id of the node
          console.log(args.element.properties.id);
        } else {
          console.log('Click on Diagram');
        }
        console.log(args);
      },
      doubleClick: (args) => {
        // this.openModal();
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
      }
    };
  },
  provide: {
    diagram: [DiagramContextMenu]
  },
  mounted() {
    diagramInstance = this.$refs.diagramControl.ej2Instances;
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
    }
  },
};

</script>


<style scoped>
#diagramEventsControlSection .sb-mobile-palette {
  width: 200px;
  height: 100%;
  float: left;
}

#diagramEventsControlSection .sb-mobile-diagram {
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
#symbolpalette_container.e-accordion .e-acrdn-item.e-select>.e-acrdn-header {
  /* changed cursor on symbolpalette as there is no events now */
  cursor: default;
}
#symbolpalette_container.e-accordion .e-acrdn-item.e-selected>.e-acrdn-header:focus {
  /* removing box shadow from symbolpalette */
  box-shadow: none;
}
</style>
