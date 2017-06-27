function Game() {
  "use strict";
  game.save = function() {
    console.log("saved");
    if (localStorage.saved) {
      localStorage.setItem("time", JSON.stringify(game.time));
      localStorage.setItem("date", JSON.stringify(game.date));
    }
  };
  game.load = function() {
    console.log("loaded");
    if (localStorage.saved) {
      game.time = JSON.parse(localStorage.getItem("time", '{"ticks":0,"seconds":0,"minutes":0,"hours":0}'));
      game.date = JSON.parse(localStorage.getItem("date"));
      $(timeCell).children('.time')[0].innerHTML = twoDigits(game.time.hours) + ":" + twoDigits(game.time.minutes) + ":" + twoDigits(game.time.seconds);
      $(timeCell).children('.ticks')[0].innerHTML = twoDigits(game.time.ticks);
    }
  };
  game.initFirst = function() {
    localStorage.setItem("saved", true);
  };
  //DeveloperStuff {
  var timeCell = document.getElementById('counter');
  initalize();
  beeDrawer();
  beeBox(null, 10);
  devFillBees();
  game.apiary = new Apiary(1);
  //DeveloperStuff }
  game.game = setInterval(ticks, 10);

  function ticks() {
    game.time.ticks += 1;
    if (game.time.ticks == 100) {
      game.time.seconds += 1;
      if (game.time.seconds == 60) {
        game.time.minutes += 1;
        if (game.time.minutes == 60) {
          game.time.hours += 1;
          game.time.minutes = 0;
        }
        game.time.seconds = 0;
        if ((game.time.minutes % 5) === 0) {
          game.save();
        }
      }
      game.time.ticks = 0;
      $(timeCell).children('.time')[0].innerHTML = twoDigits(game.time.hours) + ":" + twoDigits(game.time.minutes) + ":" + twoDigits(game.time.seconds);
    }
    $(timeCell).children('.ticks')[0].innerHTML = twoDigits(game.time.ticks);
  }
}



function initalize() {
  //BeeCells
  game.bees = {};
  game.trash = {};
  game.drawer = {};
  game.time = {};
  game.mouseDown = false;
  game.dragObj = null;
  game.time.ticks = 0;
  game.time.seconds = 0;
  game.time.minutes = 0;
  game.time.hours = 0;
  game.date = {};
  game.drawer.cells = [];
  game.drawer.drawerCounter = 0;
  game.bees.bees = [];
  game.trash.trashon = false;
  game.trash.trashList = [];
  $('.beeCell').hover(function() {
    if (!game.mouseDown) {
      this.style.backgroundColor = "#94FF00";
    }
  }, function() {
    this.style.backgroundColor = "#f1f1f1";
  });
  //Document
  $(document).mousedown(function(e) {
    game.mouseDown = true;
  }).mouseup(function(e) {
    game.mouseDown = false;
  }).mouseleave(function(e) {
    game.mouseDown = false;
  });
  //Window
  window.onbeforeunload = function() {
    game.save();
  };
  if (localStorage.saved) {
    game.load();
  } else {
    game.initFirst();
  }
}


/**
 * @param  {event}
 * @param  {tabName}
 * @return {null}
 */
function tabChange(evt, tabName) {
  "use strict";
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i += 1) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i += 1) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

/**
 * changes the size of the bee box
 * @param  {event} evt       the event that gets sent
 * @param  {integer} increment the amount to increment by
 * @return {[type]}           [description]
 */
function beeBox(evt, increment) {
  "use strict";
  var Boxes, Clone, Button, Parent, Template, Trash, length, condition, object, i;
  Parent = document.getElementById("MainBox");
  Template = document.getElementsByClassName("template")[0];
  Button = document.getElementById("beeButton");
  Trash = document.getElementById("drawerTrash");
  if (increment > 0) {
    for (i = 0; i < increment; i += 1) {
      condition = (game.drawer.cells.length === "placeholder");
      if (!condition) {
        game.drawer.drawerCounter += 1;
        Clone = Template.firstElementChild.cloneNode(true);
        Clone.className += " beeCell";
        Clone.childNodes[1].id = "beeCell" + game.drawer.drawerCounter;
        $(Clone).hide();
        Parent.insertBefore(Clone, Parent.firstChild);
        game.drawer.cells.push(Clone);
        $(Clone).fadeIn(300, "linear");
        $(Button).fadeIn(300, "linear");
        $(Trash).fadeIn(300, "linear");
      }
    }
  } else {
    condition = game.drawer.cells.length === 0;
    if (!condition) {
      increment = increment * -1;
      for (i = 0; i < increment; i += 1) {
        length = game.drawer.cells.length;
        if (length === 0) {
          break;
        }
        condition = game.drawer.cells[length - 1].firstElementChild.hasChildNodes();
        if (condition) {
          object = searchBees(game.drawer.cells[length - 1].firstElementChild.firstElementChild);
          removeBee(object);
        }
        Parent.removeChild(game.drawer.cells[length - 1]);
        game.drawer.cells.splice(game.drawer.cells.length - 1);
        game.drawer.drawerCounter += -1;
        if (game.drawer.cells.length === 0) {
          $(Button).fadeOut(300, "linear");
          $(Trash).fadeOut(300, "linear");
        }
      }
    }

  }
}

/**
 * @param  {event}
 * @return {null}
 */
function beeDrawer(evt) {
  "use strict";
  var Box, Button;
  Box = document.getElementById("beeCollapse");
  Button = document.getElementById("beeButton");
  if (Box.style.maxWidth) {
    Box.style.maxWidth = null;
    Button.innerHTML = "&laquo;";
  } else {
    Box.style.maxWidth = 100 + "%";
    Button.innerHTML = "&raquo;";
  }
}

/**
 * @param  {event}
 * @return {null}
 */
function allowDrop(evt) {
  "use strict";
  var condition, beeSex;
  condition = ($(evt.target).hasClass("bugHolderDiv"));
  if (condition) {
    condition = ($(evt.target).hasClass("princessCell") || ($(evt.target).hasClass("droneCell")));
    if (condition) {
      beeSex = searchBees(game.dragObj).isMale();
      condition = (($(evt.target).hasClass("princessCell") && (!beeSex) || ($(evt.target).hasClass("droneCell") && (beeSex))));
      if (condition) {
        evt.preventDefault();
      }
    } else {
      evt.preventDefault();
    }
  }
}

/**
 * drag and drop-drag
 * @param  {event} evt the event that gets sent
 */
function drag(evt) {
  "use strict";
  game.dragObj = evt.target;
  evt.dataTransfer.setData("dragid", evt.target.id);
  evt.dataTransfer.effectAllowed = "copyMove";
}

/**
 * drag and drop-drop
 * @param  {event} evt the event that gets sent
 */
function drop(evt) {
  "use strict";
  var data;
  evt.preventDefault();
  if ($(evt.target).hasClass('bugHolderDiv')) {
    if ($(evt.target).children().length === 0) {
      data = evt.dataTransfer.getData("dragid");
      if (($(evt.target).hasClass("princessCell")) || ($(evt.target).hasClass("droneCell"))) {
        if ($(evt.target).hasClass("princessCell")) {
          game.apiary.princess = searchBees(document.getElementById(data));
          evt.target.appendChild(document.getElementById(data));
          game.apiary.startBreeding();
        } else {
          game.apiary.drone = searchBees(document.getElementById(data));
          evt.target.appendChild(document.getElementById(data));
          game.apiary.startBreeding();
        }
      } else {
        evt.target.appendChild(document.getElementById(data));
      }
    }
  }
}

/**
 * @param {event}
 * @param {target id}
 */
function addBee(evt, elementid) {
  "use strict";
  var i, Template, html;

  function randomGender() {
    if (Math.random() >= 0.5) {
      return "Female";
    } else {
      return "Male";
    }
  }

  for (i = 0; i < 1; i += 1) {
    if ($("#" + elementid).hasClass("bugHolderDiv")) {
      if (($("#" + elementid).children().length === 0) || (elementid === "devCell")) {
        html = $.parseHTML("<img class='template' id='beesTemp' draggable='true' ondragstart='drag(event)'>")[0];
        html.className = html.className.replace("template", " bee");
        html.id = "bee" + (game.bees.bees.length);
        game.bees.bees.push(new Bee(html, randomGender(), new Trait("Random", "dr", Math.floor(Math.random() * 10), true), new Trait("Nocturnal", "rr", Math.random() >= 0.5), false));
        if (game.bees.bees[game.bees.bees.length - 1].sex == "Female") {
          html.src = "Content/beeFemale.png";
        } else {
          html.src = "Content/beeMale.png";
        }
        $(html).hide();
        document.getElementById(elementid).appendChild(html);
        $(html).fadeIn(300, "linear");
      }
    }
  }
}

/**
 * @param  {event}
 * @return {null}
 */
function beeSelect(evt) {
  "use strict";
  var i, trashIndex, object, index;
  object = searchBees(evt.currentTarget.firstElementChild.firstElementChild);
  if (game.trash.trashon) {
    if (evt.currentTarget.firstElementChild.childNodes.length) {
      if (evt.currentTarget.style.backgroundColor === "rgb(241, 241, 241)") {
        evt.currentTarget.style.backgroundColor = "#ef0202";
        if (!(game.trash.trashList.includes(object))) {
          game.trash.trashList.push(object);

        }
      } else {
        if (game.trash.trashList.includes(object)) {
          trashIndex = game.trash.trashList.indexOf(object);
          game.trash.trashList.splice(index, 1);

        }
        evt.currentTarget.style.backgroundColor = "#f1f1f1";
      }
    }
  }
}
/**
 * @param  {object}
 * @return {null}
 */
function removeBee(object) {
  "use strict";
  var index;
  index = game.bees.bees.indexOf(object);
  object.element.parentNode.removeChild(object.element);
  game.bees.bees.splice(index, 1);
  relistBees();
}
/**
 * @param  {event}
 * @return {null}
 */
function beeTrash(evt) {
  "use strict";
  var object, i, bees, condition;
  if (game.trash.trashon) {
    game.trash.trashon = false;
    evt.currentTarget.style.backgroundColor = "#f1f1f1";
    for (i = 0; i < game.trash.trashList.length; i += 1) {
      object = game.trash.trashList[i];
      object.element.parentNode.parentNode.style.backgroundColor = "#f1f1f1";
      condition = $(object.element).hasClass('deleting');
      if (!condition) {
        $(object.element).fadeOut(300, "linear");
        $(object.element).addClass('deleting');
        setTimeout(removeBee, 300, object);
      }


    }
    bees = document.getElementsByClassName("bee");
    for (i = 0; i < bees.length; i += 1) {
      bees[i].setAttribute('draggable', 'true');
    }
    game.trash.trashList = [];
  } else {
    evt.currentTarget.style.backgroundColor = "#ef0202";
    game.trash.trashon = true;
    bees = document.getElementsByClassName("bee");
    for (i = 0; i < bees.length; i += 1) {
      bees[i].setAttribute('draggable', 'false');
    }
  }
}
/**
 * @return {null}
 */
function relistBees() {
  "use strict";
  var numBees, i, numA, numB;
  numBees = game.bees.bees;
  numBees.sort(function(a, b) {
    numA = a.element.id.replace("bee", "");
    numB = b.element.id.replace("bee", "");
    return numA - numB;
  });
  for (i = 0; i < numBees.length; i += 1) {
    numBees[i].element.id = "bee" + i;
  }
  game.bees.bees = numBees;
}

/**
 * @param {element}
 * @param {sex}
 * @param {value}
 */


function Bee(a, b, c, d) {
  "use strict";
  //Statistics
  this.element = a;
  this.sex = b;
  this.random = c;
  this.nocturnal = d;

}

Bee.prototype = {
  locked: false,
  delete: function() {
    removeBee(this);
  },
  isMale: function() {
    return (this.sex == ("Male"));
  },
  lock: function() {
    this.locked = true;
    this.element.setAttribute('draggable', false);
  },
  unlock: function() {
    this.locked = false;
    this.element.setAttribute('draggable', true);
  }
};

/**
 * @param {type}
 * @param {Queen Object}
 * @param {Princess Object}
 * @param {Drone Object}
 */
function Apiary(a, b, c, d) {
  this.type = a;
  this.queen = b;
  this.princess = c;
  this.drone = d;
}

Apiary.prototype = {
  createQueen: function() {
    var self = this;
    html = $.parseHTML("<img src='Content/beeRoyal.png' class='bee' id='beesTemp' draggable='true' ondragstart='drag(event)'>")[0];
    html.id = "queen0";
    $(html).hide();
    document.getElementById("queenCell").appendChild(html);
    $(html).fadeIn(300, "linear");
    self.queen = new Bee(html, "queen", self.princess.random.value + self.drone.random.value);
    self.queen.lock();
  },
  startBreeding: function() {
    var condition, self;
    self = this;

    function dbees() {
      self.princess.delete();
      self.drone.delete();
      self.princess = undefined;
      self.drone = undefined;
    }
    condition = (typeof self.queen == "object");
    if (!condition) {
      condition = ((typeof self.princess == "object") && (typeof self.drone == "object"));
      if (condition) {
        condition = (($(self.princess.element.parentNode).hasClass("princessCell")) && ($(self.drone.element.parentNode).hasClass("droneCell")));
        if (condition) {
          self.princess.lock();
          self.drone.lock();
          barHandler("progress", "progBar", 25, 0.5, 100, function() {
            self.createQueen();
            $(self.princess.element).fadeOut(200, "linear");
            $(self.drone.element).fadeOut(200, "linear");
            $(self.princess.element).addClass('deleting');
            $(self.drone.element).addClass('deleting');
            setTimeout(dbees, 200);
            barHandler("reverse progress", "progBar", 40, -0.05, 0, function() {
              self.queen.delete();
              self.queen = undefined;
            });
          });
        } else {
          condition = ($(self.princess.element.parentNode).hasClass("princessCell"));
          if (!condition) {
            self.princess = undefined;
          } else {
            self.drone = undefined;
          }
        }
      }
    }
  }
};

function Trait(Name, Type, Value, Expressed) {
  this.name = Name;
  this.type = Type;
  this.value = Value;
  this.expressed = Expressed;
}


Trait.prototype = {
  run: function() {
    console.log("running");
  }
};
/**
 * @param  {element}
 * @return {bee}
 */
function searchBees(element) {
  "use strict";
  var array, i, index, condition;
  array = [];
  for (i = 0; i < game.bees.bees.length; i += 1) {
    array.push(game.bees.bees[i].element);
  }
  index = array.indexOf(element);
  condition = index == -1;
  if (!condition) {
    return game.bees.bees[index];
  } else {
    return null;
  }
}


/**
 * Takes a bar id and uses it
 * @param  {String} method    How the barHandler execute
 * @param  {String} id        The id of the object
 * @param  {integer} tickrate  How fast the ticks increment
 * @param  {integer} increment How much the bar increments by
 * @param  {integer} end       Where the bar ends up
 */
function barHandler(method, id, tickrate, increment, end) {
  "use strict";
  var elem, width, interval, condition, args;
  elem = document.getElementById(id).firstElementChild;
  width = parseInt(elem.style.width.replace("%", ""));
  args = arguments;
  if (isNaN(width)) {
    width = 0;
  }
  if (increment === undefined) {
    increment = 0.5;
  }

  function progress() {
    if (width >= end) {
      clearInterval(interval);
      $(elem).removeClass('progress');
      for (var i = 5; i < args.length; i++) {
        args[i]();
      }
    } else {
      width += increment;
      elem.style.width = width + '%';
    }
  }

  function reverseProgress() {
    if (width <= end) {
      clearInterval(interval);
      $(elem).removeClass('progress');
      for (var i = 5; i < args.length; i++) {
        args[i]();
      }
    } else {
      width += increment;
      elem.style.width = width + '%';
    }
  }
  if (method == "progress") {
    condition = $(elem).hasClass('progress');
    if (!condition) {
      $(elem).addClass('progress');
      interval = setInterval(progress, tickrate);
    }
  }
  if (method == "reverse progress") {
    condition = $(elem).hasClass('progress');
    if (!condition) {
      $(elem).addClass('progress');
      interval = setInterval(reverseProgress, tickrate);
    }
  }
}

function twoDigits(number) {
  return (number < 10 ? "0" + number : "" + number);

}
