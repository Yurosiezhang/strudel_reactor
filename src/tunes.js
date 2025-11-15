export const coastline_tune = `
// "coastline" @by eddyflux
// @version 1.0

samples('github:eddyflux/crate')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')

setcps(0.75)
let chords = chord("<Bbm9 Fm9>/4").dict('ireal')

stack(
  // Drums
  <track_drums>
  stack(
    s("bd").struct("<[x*<1 2> [~@3 x]] x>"),
    s("~ [rim, sd:<2 3>]").room("<0 .2>"),
    n("[0 <1 3>]*<2!3 4>").s("hh"),
    s("rd:<1!3 2>*2").mask("<0 0 1 1>/16").gain(0.6)
  )
  .bank("crate")
  .mask("<[0 1] 1 1 1>/16".early(0.5))
  .shape(perlin.range(0.1, 0.9)) // Param for d3 graph
  .log()
  </track_drums>,

  // Chords
  <track_chords>
  chords.offset(-1)
    .voicing()
    .s("gm_epiano1:1")
    .phaser(4)
    .room(perlin.range(0, 0.8)) // Param for d3 graph
    .gain(0.5)
    .log()
  </track_chords>,

  // Melody
  <track_melody>
  stack(
    n("<0!3 1*2>")
      .set(chords)
      .mode("root:g2")
      .voicing()
      .s("gm_acoustic_bass"),

    chords.n("[0 <4 3 <2 5>>*2](<3 5>,8)")
      .anchor("D5")
      .voicing()
      .segment(4)
      .clip(rand.range(0.4, 0.8))
      .room(0.75)
      .shape(0.3)
      .delay(0.25)
      .fm(sine.range(3,8).slow(8))
      .lpf(sine.range(500,1000).slow(8)) // Param for d3 graph
      .lpq(5)
      .rarely(ply("2"))
      .chunk(4, fast(2))
      .mask("<0 1 1 0>/16")
      .gain(perlin.range(0.6, 0.9))
      .log()
  )
  </track_melody>
)
.gain(0.5)
.late("[0 .01]*4")
.late("[0 .01]*2")
.size(4)
`;
