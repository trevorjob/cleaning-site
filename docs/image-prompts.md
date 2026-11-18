# Image and video prompts

Save each result into `public/images/` with the exact filename shown. The site picks it up on the next build; no code changes needed.

## The rules that keep the set consistent but alive

- **Same photography, different places.** Every shot is natural-light editorial photography with a 35mm feel and slight film grain. The spaces themselves differ: their own materials, colours and light. Do not add the brand's green and brass to the rooms.
- **Show the work.** Where people appear, show hands or a figure from behind, never a face. The uniform is always the same: a dark spruce-green apron over a white shirt, and black nitrile gloves.
- **No text, logos or brand names** in any image.

## Videos

| File | Ratio, length | Prompt |
|---|---|---|
| `hero.mp4` | 16:9, 6 s, seamless loop | Macro slow-motion shot of a black-gloved hand gliding a folded grey microfibre cloth across a white marble worktop. A faint film of moisture evaporates behind the cloth, leaving a flawless polished shine. Low, raking morning sunlight skims the surface so the cleaned path gleams. Shallow depth of field, locked-off camera, calm and precise. No text. |
| `overnight.mp4` | 16:9, 8 s | Time-lapse from a fixed camera of an open-plan office from 6pm to 7am. It starts genuinely messy: coffee cups, takeaway bags, papers and laptops left on desks, chairs pushed out at angles. Motion-blurred, ghostly figures in dark green aprons move through the room with a cleaning trolley, clearing the desks one by one, wiping surfaces, pushing chairs in and vacuuming. Outside the windows, dusk turns to night city lights, then to soft dawn. It ends with the room spotless and still in morning daylight. No faces readable. |

After generating, run each clip through the encoder. It writes a small AV1 file and an H.264 fallback, and pulls the hero poster and the two Overnight frames for the before/after slider:

```bash
scripts/encode-videos.sh hero path/to/hero.mp4
scripts/encode-videos.sh overnight path/to/overnight.mp4
```

## Statement section

| File | Ratio | Prompt |
|---|---|---|
| `statement.jpg` | 4:5 | Editorial photograph of a cleaner seen from behind, in a dark green apron and black gloves, polishing a long travertine reception desk with a cloth at dawn. Pale early light through tall windows, the lobby still empty, slight motion blur on the moving arm. Natural light, 35mm, film grain. |

## Services list on the home page (the photo that follows the cursor)

Portrait 4:5. Each shows the cleaning in progress, in its own kind of space.

| File | Prompt |
|---|---|
| `action-offices.jpg` | A cleaner seen from behind vacuuming between rows of white desks in a glass-walled City office at dusk, city lights coming on outside the windows, the floor otherwise empty. Cool blue evening light mixed with warm overhead strip lights. 35mm, film grain. |
| `action-holiday-lets.jpg` | Close-up of black-gloved hands smoothing and tucking a crisp white cotton sheet over a bed in a whitewashed seaside cottage, soft blue-grey sea light from a sash window, painted wooden floorboards. 50mm, film grain. |
| `action-airbnb.jpg` | Close-up of hands placing a neat stack of folded white towels and a small sprig of eucalyptus on the end of a bed with an oatmeal throw, in a warehouse flat with exposed brick, late afternoon sun. 50mm, film grain. |
| `action-apartments.jpg` | Macro photograph of a soft cloth polishing an antique brass basin tap to a mirror shine in a grey-veined marble bathroom, raking side light catching the brass. 85mm, shallow depth of field, film grain. |

## Services page and Contact tiles (the spaces, finished)

Landscape 4:3. Empty, finished rooms, each with its own character.

| File | Prompt |
|---|---|
| `service-offices.jpg` | A modern City of London office floor in a glass tower: white desks in long rows, grey carpet tiles, steel columns, floor-to-ceiling glazing with a view of neighbouring towers, cool clear morning daylight, everything perfectly tidy. 35mm, film grain. |
| `service-holiday-lets.jpg` | A whitewashed coastal cottage bedroom in Whitstable: painted white floorboards, a simple oak bed with white linen and a blue striped throw, a jug of sea lavender, a sash window showing a grey-blue sea, soft overcast light. 35mm, film grain. |
| `service-airbnb.jpg` | An open-plan warehouse apartment in Shoreditch: exposed London brick, an oak kitchen worktop, black metal shelving and pendant lights, a small vase of tulips, warm late afternoon sun through Crittall windows, spotless and ready for guests. 35mm, film grain. |
| `service-apartments.jpg` | A Kensington period drawing room: ornate white plaster mouldings, herringbone parquet, a deep oxblood rug, a pale linen sofa, a marble fireplace, tall sash windows with soft afternoon light, immaculate. 35mm, film grain. |

## How it starts (one image per step)

Landscape 4:3.

| File | Prompt |
|---|---|
| `step-walkthrough.jpg` | Over-the-shoulder photograph of a hand holding a slim black notebook and pen during a walk-round of an office reception, the reception desk and lobby in soft focus beyond, morning light. 35mm, film grain. |
| `step-spec.jpg` | Top-down photograph of a printed cleaning specification sheet on a clipboard with a brass clip, lying on a white marble desk beside a pen and a pair of black gloves. The printed text is too small to read. Soft daylight, film grain. |
| `step-arrival.jpg` | A tidy cleaning trolley with folded cloths and spray bottles waiting in a quiet, marble-floored lift lobby at night, warm downlights, lift doors closed, no people. 35mm, film grain. |

## Kit (keep the current ones)

Pure white background, single object, soft shadow beneath, square 1:1, PNG: `kit-spray.png` (amber glass spray bottle), `kit-cloths.png` (three folded cloths in grey, sage and oat), `kit-brush.png` (horsehair brush, walnut handle), `kit-soap.png` (glass bottle, brass cap), `kit-chamois.png` (folded chamois).

## About page

`about.jpg` (4:5) stays as it is: the glass partition sits behind the polishable haze.

## Before launch

The overnight video, the before/after slider and the cleaning-in-action shots are illustrative stand-ins. Replace them with real footage and photos of your own team and your own cleans before the site goes live. Presenting generated images as real results can breach UK consumer protection law.
