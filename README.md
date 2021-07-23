# Clickdoc Demo Projekt

## Voraussetzungen

- Protractor ist installiert
- Jasmine ist installiert

## Weitere Installationen

**Die folgenden Befehle gelten für Windows**

```npm i``` 
zum Herunterladen der Packages

```npx webdriver-manager update```
zum Updaten des Webdriver Managers

Scoop Installer herunterladen unter https://scoop.sh/

```scoop install allure```
um Allure (benötigt für Reports) herunterzuladen

## Tests ausführen

```npm test```
um die Tests zu starten

Um die Spec, die gestartet wird, zu ändern, muss **specs** (Z. 9) in **protractor.conf.js** angepasst werden

## Reporting

```allure serve```
zum Öffnen des Reports