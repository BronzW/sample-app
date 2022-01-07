import { OWWindow } from "@overwolf/overwolf-api-ts";

// A base class for the app's foreground windows.
// Sets the modal and drag behaviors, which are shared accross the desktop and in-game windows.
export class AppWindow {
  protected currWindow: OWWindow;
  protected mainWindow: OWWindow;
  protected maximized: boolean = false;

  constructor(windowName) {
    this.mainWindow = new OWWindow('background');
    this.currWindow = new OWWindow(windowName);
    if (windowName !== "in_game" && windowName !== "in-game") {
      const closeButton = document.getElementById('closeButton');
      const maximizeButton = document.getElementById('maximizeButton');
      const minimizeButton = document.getElementById('minimizeButton');
      closeButton.addEventListener('click', () => {
        this.mainWindow.close();
      });
  
      minimizeButton.addEventListener('click', () => {
        this.currWindow.minimize();
      });
  
      maximizeButton.addEventListener('click', () => {
        if (!this.maximized) {
          this.currWindow.maximize();
        } else {
          this.currWindow.restore();
        }
  
        this.maximized = !this.maximized;
      });
    }

    const header = document.getElementById('header');

    this.setDrag(header);
    
  }

  public async getWindowState() {
    return await this.currWindow.getWindowState();
  }

  private async setDrag(elem) {
    this.currWindow.dragMove(elem);
  }
}
