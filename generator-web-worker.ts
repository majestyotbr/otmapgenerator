import { OTMapGenerator } from "otmapgen/OTMapGen"

import { MapGeneratorSettings } from "./components/molecules/SettingsForm"

console.log("wtf")
const generator = new OTMapGenerator()

async function fetchLayerData(settings: MapGeneratorSettings) {
  const layerData = await new Promise((resolve, reject) => {
    const data = generator.generateMinimap(settings)

    if (!data) reject()

    resolve(data)
  })

  return layerData
}

console.log(global.addEventListener)
global.addEventListener?.("message", async (message) => {
  console.log("Message")
  const { data: { settings } = {} } = message
  if (settings) {
    try {
      const layerData = await fetchLayerData(message.data.settings)
      postMessage({ layerData })
    } catch (error) {
      console.error(error)
    }
  }
})