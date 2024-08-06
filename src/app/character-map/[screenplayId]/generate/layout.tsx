// ~/app/character-map/[screenplayId]/generate/layout.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/shadcn-components/ui/tabs"
import { Button } from "~/shadcn-components/ui/button"
import { CharacterProvider } from './CharacterContext'

export default function Layout({
  children,
  characterMap,
  moreAttributes,
  characterArc,
  perspectives,
}: {
  children: React.ReactNode
  characterMap: React.ReactNode
  moreAttributes: React.ReactNode
  characterArc: React.ReactNode
  perspectives: React.ReactNode
}) {
  return (
    <CharacterProvider>
      <div className="max-w-6xl mx-auto p-4">
        {children}
        <Tabs defaultValue="characterMap" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="characterMap">Character Map</TabsTrigger>
              <TabsTrigger value="moreAttributes">More Attributes</TabsTrigger>
              <TabsTrigger value="characterArc">Character Arc</TabsTrigger>
              <TabsTrigger value="perspectives">Perspectives</TabsTrigger>
            </TabsList>
            <Button>Submit</Button>
          </div>
          <TabsContent value="characterMap">{characterMap}</TabsContent>
          <TabsContent value="moreAttributes">{moreAttributes}</TabsContent>
          <TabsContent value="characterArc">{characterArc}</TabsContent>
          <TabsContent value="perspectives">{perspectives}</TabsContent>
        </Tabs>
      </div>
    </CharacterProvider>
  )
}