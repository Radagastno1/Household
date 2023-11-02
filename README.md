## BUZZTER

Detta är Buzzter, hushållsappen till hela familjen. Skapa konto och bjud in hushållsmedlemmarna och dela på ansvaret på det gemensamma hemmet. Skapa sysslor och klara av dem. Statistik visar varje användares hårda slit och ger möjlighet till eftertanke och omtanke. Vi valde att använda oss av biet som är välkända för att arbeta i ett lag för ett gemensamt mål. Samt att vi vill lyfta biets nytta i världens alla hörn.

## Applikationen

Buzzters utvecklades hösten 2023 av 5 ambitiösa studenter och vi använde oss av expo react native applikation tillsammans med esLint, github Action, prettier, Firestore för att nämna några.

För att komma igång med Buzzter behöver du vid nedladdning av denna kod köra `npm install`. För att köra programmet är det `npm start`som gäller i konsolen. Du kan använda din telefon eller en installerad emulator på datorn. Följ instruktionerna som ges i terminalen nedan.

## Design

Designmissarna i denna applikationen är energivärdetcirklarna som av någon besynnerlig anledning inte vill ha mellanrum mellan sig. Ofantligt många försök har gjorts och cirklarna vann...., för denna gången.

Knappen för att ändra dark- eller lightmode var en utmaning att få till så vi fick ändra designen för den. Den är inte som den illustreras i figman.

## Figma

Vi skapade en figma-mall över applikationen och den finns här: https://www.figma.com/file/XGrmgnzWdYf31u4z4IVwqF/Untitled?type=design&node-id=0-1&mode=design&t=xrQ8cfCyyiPRuJQy-0

## 2023-10-12

David har gett oss godkänt att flytta på knappen `Ändra` i HouseholdTasksScreen till TaskDetailScreen samt ändra appens titel från `Hushållet` till `Buzzter`.

## 2023-10-13

David godkände att avatarerna inte behövde vara i cirkeldiagrammet

## Betygs-krav

Antal krav: 40.
G: 20 (50%).
VG: 32 (80%).

## G

Kravlista (3)
[x] En logga, splashscreen och appikon ska designas och användas.
[x] Applikationen ska byggas med RN, Expo & TS.
[x] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
med produktägare, godkännas och dokumenteras.

Hushåll (1)
[x] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet,
namnet ska gå att ändra.

Konto (3)
[x] En användare ska kunna registrera och logga in sig.
[x] En användare ska kunna skapa ett nytt hushåll.
[x] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod.

Profil (4)
[x] En användare ska kunna ange sitt namn.
[x] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista.
[x] Valda avatarer ska inte kunna väljas av andra användare i hushållet.
[x] Avataren ska användas i appen för att visa vad användaren har gjort.

Sysslor (3)
[x] En ägare ska kunna lägga till sysslor att göra i hemmet.
[x] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en
vikt som beskriver hur energikrävande den är.
[x] En ägare ska kunna redigera en syssla.

Dagsvyn (3)
[x] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras.
[x] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar
sedan sysslan gjordes senast samt om den är försenad.
[x] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även
med ett enkelt tryck gå att markera sysslan som gjord.

Statistik (3)
[x] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt
hushåll.
[x] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt
fördelning av varje enskild syssla.
[x] Det ska finnas en statistikvy över ”nuvarande vecka”.

## VG

Kravlista (1)
[x] Information ska kommuniceras till och från en server.

Hushåll (6)
[x] Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.
[x] En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.
[x] En ägare ska kunna acceptera eller neka förfrågningar.
[] En ägare ska kunna göra andra till ägare.
[] En ägare ska kunna pausa en användare och under pausade perioder ska användare inte
tas med i statistiken.
[] Om en använder har pausats under en del av en period i statistiken ska graferna
normaliseras.

Konto (2)
[x] När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först
godkänna användaren.
[x] En användare ska kunna lämna ett hushåll.

Profil (2)
[x] En användare ska kunna ställa in appens utseende (mörkt, ljust, auto).
[x] Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de
olika hushållen.

Sysslor (3)
[] En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan
ytterligare.
[x] En ägare ska kunna ta bort en syssla.
[x] När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan
också kommer att tas bort och få valet att arkivera sysslan istället.

Statistik (3)
[x] Det ska finnas en statistikvy över ”förra vecka”.
[x] Det ska finnas en statistikvy över ”förra månaden”.
[x] Om det inte finns statistik för en av vyerna ska den vyn inte visas.

Schemaläggning (3)
[] En ägare ska kunna tilldela och ta bort sysslor från användare i hushållet.
[] Användare ska kunna se de tilldelade sysslorna i sitt gränssnitt.
[] En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i
hushållet och roteras baserat på ett intervall i dagar.
