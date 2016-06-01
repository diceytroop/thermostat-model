// scraping function for html tables:
/*
function html2json() {
   var output = {}
   var row_objects = [];
   var column_titles = [];
   var tbl2 = $('#dest_table tr').each(function(i) {
      if (i === 0) {
            x = $(this).children();
            x.each(function(index, v){
              column_titles[index]=v.outerText});
            console.log("found column titles: ", column_titles);
      } else {
            x = $(this).children();
            var item = {};
            var title = "";
            x.each(function(index, value) {

                if (index === 0) {
                   title = value.outerText;
                   item[title] = {};
                }
                else {
                  item[title][column_titles[index]]=value.outerText;
                  item[title][column_titles[index]]=parseFloat(item[title][column_titles[index]]);
                }
            });
            row_objects.push(item);
         }
   });
   console.log(row_objects);

   row_objects.forEach(function(obj) { Object.assign(output, obj); });
   console.log(JSON.stringify(output));
   return JSON.stringify(output);
} */

export var floor_materials_r_val = {
  "Plywood": {
    "Typical R-Value": 0.825,
    "R-Value Per Inch": 1.1,
    "Typical Thickness": 0.75
  },
  "Plywood Underlayment 1/4": {
    "Typical R-Value": 0.275,
    "R-Value Per Inch": 1.1,
    "Typical Thickness": 0.25
  },
  "Softwood": {
    "Typical R-Value": 0.825,
    "R-Value Per Inch": 1.1,
    "Typical Thickness": 0.75
  },
  "Sheet Vinyl": {
    "Typical R-Value": 0.2,
    "R-Value Per Inch": 1.6,
    "Typical Thickness": 0.125
  },
  "Vinyl Composition Tile (VCT)": {
    "Typical R-Value": 0.2,
    "R-Value Per Inch": 1.6,
    "Typical Thickness": 0.125
  },
  "Linoleum": {
    "Typical R-Value": 0.4,
    "R-Value Per Inch": 1.6,
    "Typical Thickness": 0.25
  },
  "Dense Rubber Flooring": {
    "Typical R-Value": 0.25,
    "R-Value Per Inch": 1.3,
    "Typical Thickness": 0.325
  },
  "Recycled Rubber Flooring": {
    "Typical R-Value": 1.1,
    "R-Value Per Inch": 2.2,
    "Typical Thickness": 0.5
  },
  "Cork": {
    "Typical R-Value": 1.125,
    "R-Value Per Inch": 3,
    "Typical Thickness": 0.375
  },
  "Cork/MDF/Laminate": {
    "Typical R-Value": 1.175,
    "R-Value Per Inch": 2.35,
    "Typical Thickness": 0.5
  },
  "Brick": {
    "Typical R-Value": 3.375,
    "R-Value Per Inch": 2.25,
    "Typical Thickness": 1.5
  },
  "Marble": {
    "Typical R-Value": 0.4,
    "R-Value Per Inch": 0.8,
    "Typical Thickness": 0.5
  },
  "Ceramic Tile": {
    "Typical R-Value": 0.25,
    "R-Value Per Inch": 1,
    "Typical Thickness": 0.25
  },
  "Thinset Mortar": {
    "Typical R-Value": 0.05,
    "R-Value Per Inch": 0.4,
    "Typical Thickness": 0.125
  },
  "MDF/Plastc Laminate": {
    "Typical R-Value": 0.5,
    "R-Value Per Inch": 1,
    "Typical Thickness": 0.5
  },
  "Laminate Floor Pad": {
    "Typical R-Value": 0.3,
    "R-Value Per Inch": 1.92,
    "Typical Thickness": 0.16
  },
  "Engineered Wood": {
    "Typical R-Value": 0.25,
    "R-Value Per Inch": 1,
    "Typical Thickness": 0.25
  },
  "Engineered Wood Flooring Pad": {
    "Typical R-Value": 0.2,
    "R-Value Per Inch": 1.6,
    "Typical Thickness": 0.125
  },
  "Engineered Bamboo": {
    "Typical R-Value": 0.72,
    "R-Value Per Inch": 0.96,
    "Typical Thickness": 0.75
  },
  "Oak": {
    "Typical R-Value": 0.638,
    "R-Value Per Inch": 0.85,
    "Typical Thickness": 0.75
  },
  "Ash": {
    "Typical R-Value": 0.75,
    "R-Value Per Inch": 1,
    "Typical Thickness": 0.75
  },
  "Maple": {
    "Typical R-Value": 0.75,
    "R-Value Per Inch": 1,
    "Typical Thickness": 0.75
  },
  "Pine": {
    "Typical R-Value": 0.975,
    "R-Value Per Inch": 1.3,
    "Typical Thickness": 0.75
  },
  "Fir": {
    "Typical R-Value": 0.9,
    "R-Value Per Inch": 1.2,
    "Typical Thickness": 0.75
  },
  "Carpet Pad/Slab Rubber 33lb": {
    "Typical R-Value": 0.32,
    "R-Value Per Inch": 1.28,
    "Typical Thickness": 0.25
  },
  "Carpet Pad/ Waffle Rubber 25 lb": {
    "Typical R-Value": 0.62,
    "R-Value Per Inch": 2.48,
    "Typical Thickness": 0.25
  },
  "Hair Jute": {
    "Typical R-Value": 1.25,
    "R-Value Per Inch": 3.88,
    "Typical Thickness": 0.325
  },
  "Prime Urethane": {
    "Typical R-Value": 1.4,
    "R-Value Per Inch": 4.3,
    "Typical Thickness": 0.325
  },
  "Bonded Urethane": {
    "Typical R-Value": 1.4,
    "R-Value Per Inch": 4.3,
    "Typical Thickness": 0.325
  },
  "Carpet": {
    "Typical R-Value": 0.7,
    "R-Value Per Inch": 2.8,
    "Typical Thickness": 0.25
  },
  "Wool Carpet": {
    "Typical R-Value": 1.575,
    "R-Value Per Inch": 4.2,
    "Typical Thickness": 0.375
  }
};

export var materials_k_val = {
  "Diamond": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 1000
  },
  "Silver": {
    "(cal/sec)/(cm2 C/cm)": 1.01,
    "(W/m K)": 406
  },
  "Copper": {
    "(cal/sec)/(cm2 C/cm)": 0.99,
    "(W/m K)": 385
  },
  "Gold": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 314
  },
  "Brass": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 109
  },
  "Aluminum": {
    "(cal/sec)/(cm2 C/cm)": 0.5,
    "(W/m K)": 205
  },
  "Iron": {
    "(cal/sec)/(cm2 C/cm)": 0.163,
    "(W/m K)": 79.5
  },
  "Steel": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 50.2
  },
  "Lead": {
    "(cal/sec)/(cm2 C/cm)": 0.083,
    "(W/m K)": 34.7
  },
  "Mercury": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 8.3
  },
  "Ice": {
    "(cal/sec)/(cm2 C/cm)": 0.005,
    "(W/m K)": 1.6
  },
  "Glass,ordinary": {
    "(cal/sec)/(cm2 C/cm)": 0.0025,
    "(W/m K)": 0.8
  },
  "Concrete": {
    "(cal/sec)/(cm2 C/cm)": 0.002,
    "(W/m K)": 0.8
  },
  "Water at 20° C": {
    "(cal/sec)/(cm2 C/cm)": 0.0014,
    "(W/m K)": 0.6
  },
  "Asbestos": {
    "(cal/sec)/(cm2 C/cm)": 0.0004,
    "(W/m K)": 0.08
  },
  "Snow (dry)": {
    "(cal/sec)/(cm2 C/cm)": 0.00026,
    "(W/m K)": null
  },
  "Fiberglass": {
    "(cal/sec)/(cm2 C/cm)": 0.00015,
    "(W/m K)": 0.04
  },
  "Brick,insulating": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.15
  },
  "Brick, red": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.6
  },
  "Cork board": {
    "(cal/sec)/(cm2 C/cm)": 0.00011,
    "(W/m K)": 0.04
  },
  "Wool felt": {
    "(cal/sec)/(cm2 C/cm)": 0.0001,
    "(W/m K)": 0.04
  },
  "Rock wool": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.04
  },
  "Polystyrene (styrofoam)": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.033
  },
  "Polyurethane": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.02
  },
  "Wood": {
    "(cal/sec)/(cm2 C/cm)": 0.0001,
    "(W/m K)": 0.12
  },
  "Air at 0° C": {
    "(cal/sec)/(cm2 C/cm)": 0.000057,
    "(W/m K)": 0.024
  },
  "Helium (20°C)": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.138
  },
  "Hydrogen(20°C)": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.172
  },
  "Nitrogen(20°C)": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.0234
  },
  "Oxygen(20°C)": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.0238
  },
  "Silica aerogel": {
    "(cal/sec)/(cm2 C/cm)": null,
    "(W/m K)": 0.003
  }
}
