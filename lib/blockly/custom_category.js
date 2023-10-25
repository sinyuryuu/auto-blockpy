/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomCategory extends Blockly.ToolboxCategory{constructor(categoryDef,toolbox,opt_parent){super(categoryDef,toolbox,opt_parent)}addColourBorder_(colour){this.rowDiv_.style.backgroundColor=colour}setSelected(isSelected){var labelDom=this.rowDiv_.getElementsByClassName("blocklyTreeLabel")[0];isSelected?(this.rowDiv_.style.backgroundColor="white",labelDom.style.color=this.colour_,this.iconDom_.style.color=this.colour_):(this.rowDiv_.style.backgroundColor=this.colour_,labelDom.style.color="black",this.iconDom_.style.color="black"),Blockly.utils.aria.setState(this.htmlDiv_,Blockly.utils.aria.State.SELECTED,isSelected)}}Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM,Blockly.ToolboxCategory.registrationName,CustomCategory,!0);