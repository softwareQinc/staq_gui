
# Staq

**staq**: A full-stack quantum processing toolkit


## Generate Executable

**Pre-Requisite Installation**

Install Node on your machine [Node](https://nodejs.org/en/download/)

**Run the following in your terminal in location of your choice**

1. Clone repository
```bash
git clone https://github.com/softwareQinc/staq_gui.git
```
2. Go into the folder
```bash
cd staq_gui
```
3. Install all dependencies
```bash
yarn install
```
**Create Executable for windows (in same directory)**

1. Package app
```bash
yarn electron-pack
```
2. Make Executable
```bash
yarn build-installer
```
3. *dist* folder will be created which you can compress and distribute. In *dist* folder you will find corresponding executable.

**If you want to run the app locally (in same directory)**

```bash
yarn dev
```
