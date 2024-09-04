# SSR Editor

Starter project for DV1677 JSRamverk

## Steg 1

Ladda ned SSR Editor från emilfolino/ssr-editor.

## Steg 2

Skapa ett git repo med utgång i den nedladdade koden.

## Steg 3

Bjud in eventuella collaborators till repot på github. Dessa får sedan köra en git clone på repot.

## Steg 4

Kör följande för att installera node moduler.
```
npm install
```

## Steg 5

Kör följande kommando för att upptäcka och åtgärda eventuella säkerhetshål.
```
npm audit
```

Det upptäcktes inte några sådana i detta läge.

## Steg 6

Skapa .env fil och lägg till port 3000 i den så att node hittar och kör koden på en port.

## Steg 7

Kör reset på databasen från roten av repot.
```
bash db/reset_db.bash
```

## Steg 8
Starta applikationen lokalt, från roten av repot.
```
node app.mjs
```

## Val av ramverk

React

Efter undersökande och genomgång av de videoserier som presenterade de olika ramverken så var vi båda eniga om att det var främst React vi var intresserade av. 
Därav blev valet förhållandevis lätt och vi ser fram emot att arbeta och lära oss mer om det ramverket.