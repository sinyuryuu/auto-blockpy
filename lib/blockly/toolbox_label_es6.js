/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ToolboxLabel extends Blockly.ToolboxItem{constructor(toolboxItemDef,parentToolbox){super(toolboxItemDef,parentToolbox),this.label=null}init(){this.label=document.createElement("label"),this.label.textContent=this.toolboxItemDef_.name,this.label.style.color=this.toolboxItemDef_.colour;const cssConfig=this.toolboxItemDef_.cssconfig;cssConfig&&this.label.classList.add(cssConfig.label)}getDiv(){return this.label}}Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM,"toolboxlabel",ToolboxLabel);