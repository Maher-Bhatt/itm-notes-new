ITMBU UNIVERSITY • COMPUTER SCIENCE & ENGINEERING

## Unit 4: JavaFX UI and Event-Driven

## Programming

Interactive academic study guide covering the JavaFX API, application structure, shapes, layouts, event handling, and animation.

Source boundary: The supplied slides list several topics as brief headers or empty diagrams without explanations: Looping, What is JavaFX?, Features of JavaFX, JDK API and Toolkit, Win32 | GWT, OpenGL | D3D, Web Kit, G Streams, Prism, Glass, Installing JavaFX, Lifecycle of JavaFX Application [Slides 2–4, 8, 11–16, 20, 40]. Further explanation requires additional slide context.

TOPIC 1

### Architecture of JavaFX API

The JavaFX API consists of several core structural components [Slide 19: Architecture of JavaFX API (Cont.)] :

Quantum Toolkit: It is an abstraction over the low-level components of Prism, Glass, Media Engine, and Web Engine. It ties Prism and GWT together and makes them available to JavaFX [Slide 19: Architecture of JavaFX API (Cont.)] .

WebView: This component is used to process HTML content. It uses a technology called Web Kit, which is an internal open-source web browser engine. It supports web technologies like HTML5, CSS, JavaScript, DOM, and SVG [Slide 19: Architecture of JavaFX API (Cont.)] .

Media Engine: Based on an open-source engine known as a Streamer, this engine supports the playback of video and audio content [Slide 19: Architecture of JavaFX API (Cont.)] .

TOPIC 2

### JavaFX Application Structure

A JavaFX application relies on a hierarchical structure consisting of a Stage, a Scene, and a Scene Graph [Slide 21: JavaFX Application Structure] .

2.1 Stage

A stage (a window) contains all the objects of a JavaFX application [Slide 26: Stage] .

It is represented by the Stage class of the package javafx.stage [Slide 26: Stage] .

The primary stage is created by the platform itself and passed as an argument to the start() method of the Application class [Slide 26: Stage] .

A stage has two parameters determining its position: Width and Height [Slide 26: Stage] .

There are five types of stages available: Decorated, Undecorated, Transparent, Unified, and Utility [Slide 26: Stage] .

2.2 Scene

A scene represents the physical contents of a JavaFX application and contains all the contents of a scene graph [Slide 27: Scene] .

Represented by the Scene class of the package javafx.scene [Slide 27: Scene] .

At any instance, the scene object is added to only one stage [Slide 27: Scene] .

You can opt for the size of the scene by passing its dimensions (height and width) along with the root node to its constructor [Slide 27: Scene] .

2.3 Steps to Create a JavaFX Application

Follow these steps to create an application [Slide 30: Steps to create JavaFX application] :

1. Extend the Application class of the javafx.application package [Slide 30: Steps to create JavaFX application] .

2. Override the start method of the Application class [Slide 30: Steps to create JavaFX application] .

3. Prepare a scene graph with the required nodes [Slide 30: Steps to create JavaFX application] .

4. Prepare a Scene with the required dimensions and add the scene graph (root node) to it [Slide 30: Steps to create JavaFX application] .

5. Prepare a stage, add the scene to the stage, and display the contents of the stage [Slide 30: Steps to create JavaFX application] .

Stage Operations: Set the title using setTitle(), attach the scene using setScene(), and display the contents using show()

[Slide 34: 5. Preparing the Stage] .

Stage (Window)

Scene (Physical Contents)

Root Node

Branch Node Leaf Node

[Slide 25: Root Node / Branch Node / Leaf Node / Stage]

Basic Application Example

Creating a Scene Graph using Group and adding it to the Stage [Slide 36-39: Basic Example of JavaFX] .

import javafx.scene.paint.Color;

public class MyFirstGUI extends Application { public void start(Stage primaryStage) throws Exception { Group root = new Group();

Scene s = new Scene(root, 600, 400);

primaryStage.setTitle("My First User Interface");

s.setFill(Color.ORANGE);

primaryStage.setScene(s);

}

} }

TOPIC 3

### 2D Shapes

JavaFX provides shape classes within the javafx.scene.shape package [Slide 42: Classes for Shape] .

Shape Description & Properties

| Line | Requires StartX, StartY, EndX, and EndY [Slide 50: Line] . |
|---|---|
| Rectangle | Requires X, Y, Width, Height. Can be rounded using ArcWidth and ArcHeight [Slide 54: Rectangle] . |
| Circle | Requires CenterX, CenterY, and Radius [Slide 58: Circle] . |
| Ellipse | Requires CenterX, CenterY, RadiusX, and RadiusY [Slide 63: Ellipse] . |
| Polygon / | Requires an array of Double points using getPoints().addAll(...) |
| Polyline | [Slide 67: Polygon / Slide 72: Polyline] . |
| CubicCurve | Requires Start, End, and two sets of Control points (ControlX1/Y1, ControlX2/Y2) [Slide 78: CubicCurve] . |
| QuadCurve | Requires Start, End, and a single set of Control points (ControlX/Y) [Slide 83: QuadCurve] . |
| Arc | Requires Center, Radius, StartAngle, and Length [Slide 87: Arc] . |

Shape, Color & Image Example

The setFill(Color) method applies color to nodes, while setStroke(Color) applies strokes [Slide 93: Applying Color to the Nodes] . Images can be loaded using the Image and ImageView classes in the javafx.scene.image package, which supports Bmp, Gif, Jpeg, and Png formats [Slide 97: JavaFX Image] .

import java.io.FileInputStream;

import javafx.scene.paint.Color;

import javafx.scene.shape.Circle;

import javafx.scene.shape.Ellipse;

import javafx.scene.image.Image;

import javafx.scene.image.ImageView;

public class ShapeColorImageExample extends Application {

public void start(Stage stage) throws Exception { // Shape Example [Slide 90] Ellipse ellipse = new Ellipse();

ellipse.setCenterX(300.0f);

ellipse.setCenterY(150.0f);

ellipse.setRadiusX(150.0f);

ellipse.setRadiusY(75.0f);

// Color Example [Slide 95] Circle circle = new Circle();

circle.setCenterX(300.0f);

circle.setCenterY(180.0f);

circle.setRadius(90.0f);

circle.setFill(Color.RED);

circle.setStrokeWidth(3);

circle.setStroke(Color.GREEN);

// Image Example [Slide 98] // Image image = new Image(new FileInputStream("D://image.jpg"));

// ImageView imageView = new ImageView(image);

Group root = new Group(ellipse, circle);

Scene scene = new Scene(root, 600, 500);

stage.setScene(scene);

stage.show();

}

public static void main(String args[]) {

} }

TOPIC 4

### Layout Panes

Layout refers to the arrangement of components within a container. All layout classes belong to the package javafx.scene.layout, and the class named Pane is the base class of all layouts in JavaFX [Slide 100: Layout Panes] .

HBox: Arranges all nodes in a single horizontal row [Slide 105: HBox] .

VBox: Arranges all nodes in a single vertical column [Slide 108: VBox] .

BorderPane: Arranges nodes in top, left, right, bottom, and center positions [Slide 110: BorderPane] .

StackPane: Arranges nodes on top of another just like in a stack. The node added first is placed at the bottom [Slide 114: StackPane] .

TextFlow: Arranges multiple text nodes in a single flow [Slide 116: TextFlow] .

AnchorPane: Anchors the nodes at a particular distance from the pane [Slide 119: AnchorPane] .

TilePane: Adds all nodes in the form of uniformly sized tiles [Slide 123: TilePane] .

GridPane: Arranges nodes as a grid of rows and columns. Comes handy while creating forms [Slide 126: GridPane] .

FlowPane: Wraps all nodes in a flow. A horizontal flow pane wraps elements at its height, while a vertical flow pane wraps elements at its width [Slide 128: FlowPane] .

Layout Example

import javafx.geometry.Insets;

import javafx.scene.control.Button;

import javafx.scene.control.TextField;

import javafx.scene.layout.HBox;

public class LayoutExample extends Application {

public void start(Stage stage) { TextField textField = new TextField();

Button playButton = new Button("Play");

Button stopButton = new Button("stop");

HBox hbox = new HBox();

hbox.setSpacing(10);

HBox.setMargin(textField, new Insets(20, 20, 20, 20));

HBox.setMargin(playButton, new Insets(20, 20, 20, 20));

HBox.setMargin(stopButton, new Insets(20, 20, 20, 20));

hbox.getChildren().addAll(textField, playButton, stopButton);

Scene scene = new Scene(hbox);

stage.setScene(scene);

stage.show();

}

public static void main(String args[]) {

} }

[Slide 130: Creating a Layout]

TOPIC 5

### Event Handling

Target Selection

When an action occurs, the system determines the target node based on internal rules [Slide 134: Event Handling Phases] :

Key events: Node that has focus.

Mouse events: Node at the location of the cursor.

Gesture events: Node at the center point of all touches at the beginning.

Swipe events: Node at the center of the entire path of all fingers.

Touch events: Node at the location first pressed.

Event Phases

Route Construction: The default route of an event is determined by the construction of an Event Dispatch chain (path from the stage to the source node)

[Slide 134: Event Handling Phases] .

1. Event Capturing Phase: The root node dispatches the event, traveling to all nodes in the dispatch chain from top to bottom. If any node has a filter registered, it will execute [Slide 134: Event Handling Phases] .

2. Event Bubbling Phase: The event travels from the target node back to the stage node (bottom to top). If any node has a handler registered, it will execute [Slide 135: Event Handling Phases (Cont.)] .

Stage Node (Top)

Root Node

Target Node (Bottom)

[Slides 134-135: Capturing & Bubbling Phases]

Event route: Capturing travels from the stage through the root to the target (filters); bubbling travels from the target back to the stage (handlers).

Handling Mouse Events Example

import javafx.event.EventHandler;

import javafx.scene.input.MouseEvent;

public class MouseEventExample extends Application {

public void start(Stage primaryStage) { Group root = new Group();

Scene scene = new Scene(root, 300, 250);

EventHandler<MouseEvent> mouseHandler = new EventHandler<MouseEvent>() {

public void handle(MouseEvent mouseEvent) { System.out.println(mouseEvent.getEventType() + "\n" + "X : Y - " + mouseEvent.getX() + " : " + mouseEvent.getY());

} };

scene.setOnMouseClicked(mouseHandler);

scene.setOnMouseDragged(mouseHandler);

scene.setOnMouseEntered(mouseHandler);

primaryStage.setScene(scene);

}

} }

[Slide 137-138: Handling Mouse Event]

TOPIC 6

### Animation

JavaFX provides an easy-to-use animation API via the javafx.animation package. Predefined animations include [Slide 140: Animation] :

TranslateTransition: Allows movement from one point to another. Precision can be set using setByX/Y or setToX/Y [Slide 140: Animation] .

ScaleTransition: Animates the scale/zoom of an object (enlarging or minimizing)

[Slide 140: Animation] .

RotateTransition: Animates the rotation of an object. Use toAngle or byAngle [Slide 140: Animation] .

FadeTransition: Creates a fade-in/fade-out effect by controlling opacity via to and from values [Slide 140: Animation] .

PathTransition: Moves an object through a specified path, ranging from straight lines to complex quadratic curves [Slide 140: Animation] .

RotateTransition Example

import javafx.animation.RotateTransition;

import javafx.scene.shape.Rectangle;

import javafx.util.Duration;

public class AnimationExample extends Application {

public void start(Stage primaryStage) throws Exception { Rectangle rect = new Rectangle(200, 400);

rect.setX(400);

rect.setY(150);

Group root = new Group(rect);

Scene s = new Scene(root, 1000, 700);

Duration dt = new Duration(2500);

RotateTransition rt = new RotateTransition(dt, rect);

rt.setByAngle(180);

rt.play();

primaryStage.setScene(s);

}

} }

[Slide 141: Example Animation]

ITMBU University • Computer Science & Engineering • Unit 4 Study Guide
