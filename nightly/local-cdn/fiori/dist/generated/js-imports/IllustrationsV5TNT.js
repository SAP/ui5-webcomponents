// @ts-nocheck
import { registerIllustrationLoader } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
export const loadIllustration = async (illustrationName) => {
    const collectionAndPrefix = "tnt/V5/";
    const cleanIllustrationName = illustrationName.startsWith(collectionAndPrefix) ? illustrationName.replace(collectionAndPrefix, "") : illustrationName;
    switch (cleanIllustrationName) {
        case "ChartArea": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartarea" */ "../../illustrations-v5/tnt/ChartArea.js")).default;
        case "ChartArea2": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartarea2" */ "../../illustrations-v5/tnt/ChartArea2.js")).default;
        case "ChartBPMNFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartbpmnflow" */ "../../illustrations-v5/tnt/ChartBPMNFlow.js")).default;
        case "ChartBar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartbar" */ "../../illustrations-v5/tnt/ChartBar.js")).default;
        case "ChartBullet": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartbullet" */ "../../illustrations-v5/tnt/ChartBullet.js")).default;
        case "ChartDoughnut": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartdoughnut" */ "../../illustrations-v5/tnt/ChartDoughnut.js")).default;
        case "ChartFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartflow" */ "../../illustrations-v5/tnt/ChartFlow.js")).default;
        case "ChartGantt": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartgantt" */ "../../illustrations-v5/tnt/ChartGantt.js")).default;
        case "ChartOrg": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartorg" */ "../../illustrations-v5/tnt/ChartOrg.js")).default;
        case "ChartPie": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-chartpie" */ "../../illustrations-v5/tnt/ChartPie.js")).default;
        case "CodePlaceholder": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-codeplaceholder" */ "../../illustrations-v5/tnt/CodePlaceholder.js")).default;
        case "Company": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-company" */ "../../illustrations-v5/tnt/Company.js")).default;
        case "Components": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-components" */ "../../illustrations-v5/tnt/Components.js")).default;
        case "EmptyContentPane": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-emptycontentpane" */ "../../illustrations-v5/tnt/EmptyContentPane.js")).default;
        case "ExternalLink": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-externallink" */ "../../illustrations-v5/tnt/ExternalLink.js")).default;
        case "FaceID": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-faceid" */ "../../illustrations-v5/tnt/FaceID.js")).default;
        case "Fingerprint": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-fingerprint" */ "../../illustrations-v5/tnt/Fingerprint.js")).default;
        case "Lock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-lock" */ "../../illustrations-v5/tnt/Lock.js")).default;
        case "Mission": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-mission" */ "../../illustrations-v5/tnt/Mission.js")).default;
        case "NoApplications": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-noapplications" */ "../../illustrations-v5/tnt/NoApplications.js")).default;
        case "NoFlows": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-noflows" */ "../../illustrations-v5/tnt/NoFlows.js")).default;
        case "NoUsers": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-nousers" */ "../../illustrations-v5/tnt/NoUsers.js")).default;
        case "Radar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-radar" */ "../../illustrations-v5/tnt/Radar.js")).default;
        case "Secrets": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-secrets" */ "../../illustrations-v5/tnt/Secrets.js")).default;
        case "Services": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-services" */ "../../illustrations-v5/tnt/Services.js")).default;
        case "SessionExpired": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-sessionexpired" */ "../../illustrations-v5/tnt/SessionExpired.js")).default;
        case "SessionExpiring": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-sessionexpiring" */ "../../illustrations-v5/tnt/SessionExpiring.js")).default;
        case "Success": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-success" */ "../../illustrations-v5/tnt/Success.js")).default;
        case "SuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-successfulauth" */ "../../illustrations-v5/tnt/SuccessfulAuth.js")).default;
        case "Systems": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-systems" */ "../../illustrations-v5/tnt/Systems.js")).default;
        case "Teams": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-teams" */ "../../illustrations-v5/tnt/Teams.js")).default;
        case "Tools": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tools" */ "../../illustrations-v5/tnt/Tools.js")).default;
        case "Unlock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-unlock" */ "../../illustrations-v5/tnt/Unlock.js")).default;
        case "UnsuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-unsuccessfulauth" */ "../../illustrations-v5/tnt/UnsuccessfulAuth.js")).default;
        case "tnt-Dialog-ChartArea": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartarea" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartArea.js")).default;
        case "tnt-Dialog-ChartArea2": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartarea2" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartArea2.js")).default;
        case "tnt-Dialog-ChartBPMNFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartbpmnflow" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartBPMNFlow.js")).default;
        case "tnt-Dialog-ChartBar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartbar" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartBar.js")).default;
        case "tnt-Dialog-ChartBullet": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartbullet" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartBullet.js")).default;
        case "tnt-Dialog-ChartDoughnut": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartdoughnut" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartDoughnut.js")).default;
        case "tnt-Dialog-ChartFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartflow" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartFlow.js")).default;
        case "tnt-Dialog-ChartGantt": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartgantt" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartGantt.js")).default;
        case "tnt-Dialog-ChartOrg": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartorg" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartOrg.js")).default;
        case "tnt-Dialog-ChartPie": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-chartpie" */ "../../illustrations-v5/tnt/tnt-Dialog-ChartPie.js")).default;
        case "tnt-Dialog-CodePlaceholder": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-codeplaceholder" */ "../../illustrations-v5/tnt/tnt-Dialog-CodePlaceholder.js")).default;
        case "tnt-Dialog-Company": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-company" */ "../../illustrations-v5/tnt/tnt-Dialog-Company.js")).default;
        case "tnt-Dialog-Components": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-components" */ "../../illustrations-v5/tnt/tnt-Dialog-Components.js")).default;
        case "tnt-Dialog-EmptyContentPane": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-emptycontentpane" */ "../../illustrations-v5/tnt/tnt-Dialog-EmptyContentPane.js")).default;
        case "tnt-Dialog-ExternalLink": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-externallink" */ "../../illustrations-v5/tnt/tnt-Dialog-ExternalLink.js")).default;
        case "tnt-Dialog-FaceID": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-faceid" */ "../../illustrations-v5/tnt/tnt-Dialog-FaceID.js")).default;
        case "tnt-Dialog-Fingerprint": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-fingerprint" */ "../../illustrations-v5/tnt/tnt-Dialog-Fingerprint.js")).default;
        case "tnt-Dialog-Lock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-lock" */ "../../illustrations-v5/tnt/tnt-Dialog-Lock.js")).default;
        case "tnt-Dialog-Mission": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-mission" */ "../../illustrations-v5/tnt/tnt-Dialog-Mission.js")).default;
        case "tnt-Dialog-NoApplications": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-noapplications" */ "../../illustrations-v5/tnt/tnt-Dialog-NoApplications.js")).default;
        case "tnt-Dialog-NoFlows": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-noflows" */ "../../illustrations-v5/tnt/tnt-Dialog-NoFlows.js")).default;
        case "tnt-Dialog-NoUsers": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-nousers" */ "../../illustrations-v5/tnt/tnt-Dialog-NoUsers.js")).default;
        case "tnt-Dialog-Radar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-radar" */ "../../illustrations-v5/tnt/tnt-Dialog-Radar.js")).default;
        case "tnt-Dialog-Secrets": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-secrets" */ "../../illustrations-v5/tnt/tnt-Dialog-Secrets.js")).default;
        case "tnt-Dialog-Services": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-services" */ "../../illustrations-v5/tnt/tnt-Dialog-Services.js")).default;
        case "tnt-Dialog-SessionExpired": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-sessionexpired" */ "../../illustrations-v5/tnt/tnt-Dialog-SessionExpired.js")).default;
        case "tnt-Dialog-SessionExpiring": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-sessionexpiring" */ "../../illustrations-v5/tnt/tnt-Dialog-SessionExpiring.js")).default;
        case "tnt-Dialog-Success": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-success" */ "../../illustrations-v5/tnt/tnt-Dialog-Success.js")).default;
        case "tnt-Dialog-SuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-successfulauth" */ "../../illustrations-v5/tnt/tnt-Dialog-SuccessfulAuth.js")).default;
        case "tnt-Dialog-Systems": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-systems" */ "../../illustrations-v5/tnt/tnt-Dialog-Systems.js")).default;
        case "tnt-Dialog-Teams": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-teams" */ "../../illustrations-v5/tnt/tnt-Dialog-Teams.js")).default;
        case "tnt-Dialog-Tools": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-tools" */ "../../illustrations-v5/tnt/tnt-Dialog-Tools.js")).default;
        case "tnt-Dialog-Unlock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-unlock" */ "../../illustrations-v5/tnt/tnt-Dialog-Unlock.js")).default;
        case "tnt-Dialog-UnsuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dialog-unsuccessfulauth" */ "../../illustrations-v5/tnt/tnt-Dialog-UnsuccessfulAuth.js")).default;
        case "tnt-Dot-ChartArea": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartarea" */ "../../illustrations-v5/tnt/tnt-Dot-ChartArea.js")).default;
        case "tnt-Dot-ChartArea2": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartarea2" */ "../../illustrations-v5/tnt/tnt-Dot-ChartArea2.js")).default;
        case "tnt-Dot-ChartBPMNFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartbpmnflow" */ "../../illustrations-v5/tnt/tnt-Dot-ChartBPMNFlow.js")).default;
        case "tnt-Dot-ChartBar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartbar" */ "../../illustrations-v5/tnt/tnt-Dot-ChartBar.js")).default;
        case "tnt-Dot-ChartBullet": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartbullet" */ "../../illustrations-v5/tnt/tnt-Dot-ChartBullet.js")).default;
        case "tnt-Dot-ChartDoughnut": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartdoughnut" */ "../../illustrations-v5/tnt/tnt-Dot-ChartDoughnut.js")).default;
        case "tnt-Dot-ChartFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartflow" */ "../../illustrations-v5/tnt/tnt-Dot-ChartFlow.js")).default;
        case "tnt-Dot-ChartGantt": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartgantt" */ "../../illustrations-v5/tnt/tnt-Dot-ChartGantt.js")).default;
        case "tnt-Dot-ChartOrg": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartorg" */ "../../illustrations-v5/tnt/tnt-Dot-ChartOrg.js")).default;
        case "tnt-Dot-ChartPie": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-chartpie" */ "../../illustrations-v5/tnt/tnt-Dot-ChartPie.js")).default;
        case "tnt-Dot-CodePlaceholder": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-codeplaceholder" */ "../../illustrations-v5/tnt/tnt-Dot-CodePlaceholder.js")).default;
        case "tnt-Dot-Company": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-company" */ "../../illustrations-v5/tnt/tnt-Dot-Company.js")).default;
        case "tnt-Dot-Components": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-components" */ "../../illustrations-v5/tnt/tnt-Dot-Components.js")).default;
        case "tnt-Dot-EmptyContentPane": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-emptycontentpane" */ "../../illustrations-v5/tnt/tnt-Dot-EmptyContentPane.js")).default;
        case "tnt-Dot-ExternalLink": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-externallink" */ "../../illustrations-v5/tnt/tnt-Dot-ExternalLink.js")).default;
        case "tnt-Dot-FaceID": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-faceid" */ "../../illustrations-v5/tnt/tnt-Dot-FaceID.js")).default;
        case "tnt-Dot-Fingerprint": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-fingerprint" */ "../../illustrations-v5/tnt/tnt-Dot-Fingerprint.js")).default;
        case "tnt-Dot-Lock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-lock" */ "../../illustrations-v5/tnt/tnt-Dot-Lock.js")).default;
        case "tnt-Dot-Mission": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-mission" */ "../../illustrations-v5/tnt/tnt-Dot-Mission.js")).default;
        case "tnt-Dot-NoApplications": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-noapplications" */ "../../illustrations-v5/tnt/tnt-Dot-NoApplications.js")).default;
        case "tnt-Dot-NoFlows": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-noflows" */ "../../illustrations-v5/tnt/tnt-Dot-NoFlows.js")).default;
        case "tnt-Dot-NoUsers": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-nousers" */ "../../illustrations-v5/tnt/tnt-Dot-NoUsers.js")).default;
        case "tnt-Dot-Radar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-radar" */ "../../illustrations-v5/tnt/tnt-Dot-Radar.js")).default;
        case "tnt-Dot-Secrets": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-secrets" */ "../../illustrations-v5/tnt/tnt-Dot-Secrets.js")).default;
        case "tnt-Dot-Services": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-services" */ "../../illustrations-v5/tnt/tnt-Dot-Services.js")).default;
        case "tnt-Dot-SessionExpired": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-sessionexpired" */ "../../illustrations-v5/tnt/tnt-Dot-SessionExpired.js")).default;
        case "tnt-Dot-SessionExpiring": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-sessionexpiring" */ "../../illustrations-v5/tnt/tnt-Dot-SessionExpiring.js")).default;
        case "tnt-Dot-Success": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-success" */ "../../illustrations-v5/tnt/tnt-Dot-Success.js")).default;
        case "tnt-Dot-SuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-successfulauth" */ "../../illustrations-v5/tnt/tnt-Dot-SuccessfulAuth.js")).default;
        case "tnt-Dot-Systems": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-systems" */ "../../illustrations-v5/tnt/tnt-Dot-Systems.js")).default;
        case "tnt-Dot-Teams": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-teams" */ "../../illustrations-v5/tnt/tnt-Dot-Teams.js")).default;
        case "tnt-Dot-Tools": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-tools" */ "../../illustrations-v5/tnt/tnt-Dot-Tools.js")).default;
        case "tnt-Dot-Unlock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-unlock" */ "../../illustrations-v5/tnt/tnt-Dot-Unlock.js")).default;
        case "tnt-Dot-UnsuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-dot-unsuccessfulauth" */ "../../illustrations-v5/tnt/tnt-Dot-UnsuccessfulAuth.js")).default;
        case "tnt-Scene-ChartArea": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartarea" */ "../../illustrations-v5/tnt/tnt-Scene-ChartArea.js")).default;
        case "tnt-Scene-ChartArea2": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartarea2" */ "../../illustrations-v5/tnt/tnt-Scene-ChartArea2.js")).default;
        case "tnt-Scene-ChartBPMNFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartbpmnflow" */ "../../illustrations-v5/tnt/tnt-Scene-ChartBPMNFlow.js")).default;
        case "tnt-Scene-ChartBar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartbar" */ "../../illustrations-v5/tnt/tnt-Scene-ChartBar.js")).default;
        case "tnt-Scene-ChartBullet": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartbullet" */ "../../illustrations-v5/tnt/tnt-Scene-ChartBullet.js")).default;
        case "tnt-Scene-ChartDoughnut": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartdoughnut" */ "../../illustrations-v5/tnt/tnt-Scene-ChartDoughnut.js")).default;
        case "tnt-Scene-ChartFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartflow" */ "../../illustrations-v5/tnt/tnt-Scene-ChartFlow.js")).default;
        case "tnt-Scene-ChartGantt": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartgantt" */ "../../illustrations-v5/tnt/tnt-Scene-ChartGantt.js")).default;
        case "tnt-Scene-ChartOrg": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartorg" */ "../../illustrations-v5/tnt/tnt-Scene-ChartOrg.js")).default;
        case "tnt-Scene-ChartPie": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-chartpie" */ "../../illustrations-v5/tnt/tnt-Scene-ChartPie.js")).default;
        case "tnt-Scene-CodePlaceholder": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-codeplaceholder" */ "../../illustrations-v5/tnt/tnt-Scene-CodePlaceholder.js")).default;
        case "tnt-Scene-Company": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-company" */ "../../illustrations-v5/tnt/tnt-Scene-Company.js")).default;
        case "tnt-Scene-Components": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-components" */ "../../illustrations-v5/tnt/tnt-Scene-Components.js")).default;
        case "tnt-Scene-EmptyContentPane": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-emptycontentpane" */ "../../illustrations-v5/tnt/tnt-Scene-EmptyContentPane.js")).default;
        case "tnt-Scene-ExternalLink": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-externallink" */ "../../illustrations-v5/tnt/tnt-Scene-ExternalLink.js")).default;
        case "tnt-Scene-FaceID": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-faceid" */ "../../illustrations-v5/tnt/tnt-Scene-FaceID.js")).default;
        case "tnt-Scene-Fingerprint": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-fingerprint" */ "../../illustrations-v5/tnt/tnt-Scene-Fingerprint.js")).default;
        case "tnt-Scene-Lock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-lock" */ "../../illustrations-v5/tnt/tnt-Scene-Lock.js")).default;
        case "tnt-Scene-Mission": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-mission" */ "../../illustrations-v5/tnt/tnt-Scene-Mission.js")).default;
        case "tnt-Scene-NoApplications": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-noapplications" */ "../../illustrations-v5/tnt/tnt-Scene-NoApplications.js")).default;
        case "tnt-Scene-NoFlows": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-noflows" */ "../../illustrations-v5/tnt/tnt-Scene-NoFlows.js")).default;
        case "tnt-Scene-NoUsers": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-nousers" */ "../../illustrations-v5/tnt/tnt-Scene-NoUsers.js")).default;
        case "tnt-Scene-Radar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-radar" */ "../../illustrations-v5/tnt/tnt-Scene-Radar.js")).default;
        case "tnt-Scene-Secrets": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-secrets" */ "../../illustrations-v5/tnt/tnt-Scene-Secrets.js")).default;
        case "tnt-Scene-Services": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-services" */ "../../illustrations-v5/tnt/tnt-Scene-Services.js")).default;
        case "tnt-Scene-SessionExpired": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-sessionexpired" */ "../../illustrations-v5/tnt/tnt-Scene-SessionExpired.js")).default;
        case "tnt-Scene-SessionExpiring": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-sessionexpiring" */ "../../illustrations-v5/tnt/tnt-Scene-SessionExpiring.js")).default;
        case "tnt-Scene-Success": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-success" */ "../../illustrations-v5/tnt/tnt-Scene-Success.js")).default;
        case "tnt-Scene-SuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-successfulauth" */ "../../illustrations-v5/tnt/tnt-Scene-SuccessfulAuth.js")).default;
        case "tnt-Scene-Systems": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-systems" */ "../../illustrations-v5/tnt/tnt-Scene-Systems.js")).default;
        case "tnt-Scene-Teams": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-teams" */ "../../illustrations-v5/tnt/tnt-Scene-Teams.js")).default;
        case "tnt-Scene-Tools": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-tools" */ "../../illustrations-v5/tnt/tnt-Scene-Tools.js")).default;
        case "tnt-Scene-Unlock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-unlock" */ "../../illustrations-v5/tnt/tnt-Scene-Unlock.js")).default;
        case "tnt-Scene-UnsuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-scene-unsuccessfulauth" */ "../../illustrations-v5/tnt/tnt-Scene-UnsuccessfulAuth.js")).default;
        case "tnt-Spot-ChartArea": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartarea" */ "../../illustrations-v5/tnt/tnt-Spot-ChartArea.js")).default;
        case "tnt-Spot-ChartArea2": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartarea2" */ "../../illustrations-v5/tnt/tnt-Spot-ChartArea2.js")).default;
        case "tnt-Spot-ChartBPMNFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartbpmnflow" */ "../../illustrations-v5/tnt/tnt-Spot-ChartBPMNFlow.js")).default;
        case "tnt-Spot-ChartBar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartbar" */ "../../illustrations-v5/tnt/tnt-Spot-ChartBar.js")).default;
        case "tnt-Spot-ChartBullet": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartbullet" */ "../../illustrations-v5/tnt/tnt-Spot-ChartBullet.js")).default;
        case "tnt-Spot-ChartDoughnut": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartdoughnut" */ "../../illustrations-v5/tnt/tnt-Spot-ChartDoughnut.js")).default;
        case "tnt-Spot-ChartFlow": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartflow" */ "../../illustrations-v5/tnt/tnt-Spot-ChartFlow.js")).default;
        case "tnt-Spot-ChartGantt": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartgantt" */ "../../illustrations-v5/tnt/tnt-Spot-ChartGantt.js")).default;
        case "tnt-Spot-ChartOrg": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartorg" */ "../../illustrations-v5/tnt/tnt-Spot-ChartOrg.js")).default;
        case "tnt-Spot-ChartPie": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-chartpie" */ "../../illustrations-v5/tnt/tnt-Spot-ChartPie.js")).default;
        case "tnt-Spot-CodePlaceholder": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-codeplaceholder" */ "../../illustrations-v5/tnt/tnt-Spot-CodePlaceholder.js")).default;
        case "tnt-Spot-Company": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-company" */ "../../illustrations-v5/tnt/tnt-Spot-Company.js")).default;
        case "tnt-Spot-Components": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-components" */ "../../illustrations-v5/tnt/tnt-Spot-Components.js")).default;
        case "tnt-Spot-EmptyContentPane": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-emptycontentpane" */ "../../illustrations-v5/tnt/tnt-Spot-EmptyContentPane.js")).default;
        case "tnt-Spot-ExternalLink": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-externallink" */ "../../illustrations-v5/tnt/tnt-Spot-ExternalLink.js")).default;
        case "tnt-Spot-FaceID": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-faceid" */ "../../illustrations-v5/tnt/tnt-Spot-FaceID.js")).default;
        case "tnt-Spot-Fingerprint": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-fingerprint" */ "../../illustrations-v5/tnt/tnt-Spot-Fingerprint.js")).default;
        case "tnt-Spot-Lock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-lock" */ "../../illustrations-v5/tnt/tnt-Spot-Lock.js")).default;
        case "tnt-Spot-Mission": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-mission" */ "../../illustrations-v5/tnt/tnt-Spot-Mission.js")).default;
        case "tnt-Spot-NoApplications": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-noapplications" */ "../../illustrations-v5/tnt/tnt-Spot-NoApplications.js")).default;
        case "tnt-Spot-NoFlows": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-noflows" */ "../../illustrations-v5/tnt/tnt-Spot-NoFlows.js")).default;
        case "tnt-Spot-NoUsers": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-nousers" */ "../../illustrations-v5/tnt/tnt-Spot-NoUsers.js")).default;
        case "tnt-Spot-Radar": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-radar" */ "../../illustrations-v5/tnt/tnt-Spot-Radar.js")).default;
        case "tnt-Spot-Secrets": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-secrets" */ "../../illustrations-v5/tnt/tnt-Spot-Secrets.js")).default;
        case "tnt-Spot-Services": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-services" */ "../../illustrations-v5/tnt/tnt-Spot-Services.js")).default;
        case "tnt-Spot-SessionExpired": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-sessionexpired" */ "../../illustrations-v5/tnt/tnt-Spot-SessionExpired.js")).default;
        case "tnt-Spot-SessionExpiring": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-sessionexpiring" */ "../../illustrations-v5/tnt/tnt-Spot-SessionExpiring.js")).default;
        case "tnt-Spot-Success": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-success" */ "../../illustrations-v5/tnt/tnt-Spot-Success.js")).default;
        case "tnt-Spot-SuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-successfulauth" */ "../../illustrations-v5/tnt/tnt-Spot-SuccessfulAuth.js")).default;
        case "tnt-Spot-Systems": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-systems" */ "../../illustrations-v5/tnt/tnt-Spot-Systems.js")).default;
        case "tnt-Spot-Teams": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-teams" */ "../../illustrations-v5/tnt/tnt-Spot-Teams.js")).default;
        case "tnt-Spot-Tools": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-tools" */ "../../illustrations-v5/tnt/tnt-Spot-Tools.js")).default;
        case "tnt-Spot-Unlock": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-unlock" */ "../../illustrations-v5/tnt/tnt-Spot-Unlock.js")).default;
        case "tnt-Spot-UnsuccessfulAuth": return (await import(/* webpackChunkName: "ui5-webcomponents-fiori-tnt-spot-unsuccessfulauth" */ "../../illustrations-v5/tnt/tnt-Spot-UnsuccessfulAuth.js")).default;
        default:
            throw new Error("[Illustrations] Illustration not found: " + illustrationName);
    }
};
const loadAndCheck = async (illustrationName) => {
    const data = await loadIllustration(illustrationName);
    return data;
};
["ChartArea", "ChartArea2", "ChartBPMNFlow", "ChartBar", "ChartBullet", "ChartDoughnut", "ChartFlow", "ChartGantt", "ChartOrg", "ChartPie", "CodePlaceholder", "Company", "Components", "EmptyContentPane", "ExternalLink", "FaceID", "Fingerprint", "Lock", "Mission", "NoApplications", "NoFlows", "NoUsers", "Radar", "Secrets", "Services", "SessionExpired", "SessionExpiring", "Success", "SuccessfulAuth", "Systems", "Teams", "Tools", "Unlock", "UnsuccessfulAuth", "tnt-Dialog-ChartArea", "tnt-Dialog-ChartArea2", "tnt-Dialog-ChartBPMNFlow", "tnt-Dialog-ChartBar", "tnt-Dialog-ChartBullet", "tnt-Dialog-ChartDoughnut", "tnt-Dialog-ChartFlow", "tnt-Dialog-ChartGantt", "tnt-Dialog-ChartOrg", "tnt-Dialog-ChartPie", "tnt-Dialog-CodePlaceholder", "tnt-Dialog-Company", "tnt-Dialog-Components", "tnt-Dialog-EmptyContentPane", "tnt-Dialog-ExternalLink", "tnt-Dialog-FaceID", "tnt-Dialog-Fingerprint", "tnt-Dialog-Lock", "tnt-Dialog-Mission", "tnt-Dialog-NoApplications", "tnt-Dialog-NoFlows", "tnt-Dialog-NoUsers", "tnt-Dialog-Radar", "tnt-Dialog-Secrets", "tnt-Dialog-Services", "tnt-Dialog-SessionExpired", "tnt-Dialog-SessionExpiring", "tnt-Dialog-Success", "tnt-Dialog-SuccessfulAuth", "tnt-Dialog-Systems", "tnt-Dialog-Teams", "tnt-Dialog-Tools", "tnt-Dialog-Unlock", "tnt-Dialog-UnsuccessfulAuth", "tnt-Dot-ChartArea", "tnt-Dot-ChartArea2", "tnt-Dot-ChartBPMNFlow", "tnt-Dot-ChartBar", "tnt-Dot-ChartBullet", "tnt-Dot-ChartDoughnut", "tnt-Dot-ChartFlow", "tnt-Dot-ChartGantt", "tnt-Dot-ChartOrg", "tnt-Dot-ChartPie", "tnt-Dot-CodePlaceholder", "tnt-Dot-Company", "tnt-Dot-Components", "tnt-Dot-EmptyContentPane", "tnt-Dot-ExternalLink", "tnt-Dot-FaceID", "tnt-Dot-Fingerprint", "tnt-Dot-Lock", "tnt-Dot-Mission", "tnt-Dot-NoApplications", "tnt-Dot-NoFlows", "tnt-Dot-NoUsers", "tnt-Dot-Radar", "tnt-Dot-Secrets", "tnt-Dot-Services", "tnt-Dot-SessionExpired", "tnt-Dot-SessionExpiring", "tnt-Dot-Success", "tnt-Dot-SuccessfulAuth", "tnt-Dot-Systems", "tnt-Dot-Teams", "tnt-Dot-Tools", "tnt-Dot-Unlock", "tnt-Dot-UnsuccessfulAuth", "tnt-Scene-ChartArea", "tnt-Scene-ChartArea2", "tnt-Scene-ChartBPMNFlow", "tnt-Scene-ChartBar", "tnt-Scene-ChartBullet", "tnt-Scene-ChartDoughnut", "tnt-Scene-ChartFlow", "tnt-Scene-ChartGantt", "tnt-Scene-ChartOrg", "tnt-Scene-ChartPie", "tnt-Scene-CodePlaceholder", "tnt-Scene-Company", "tnt-Scene-Components", "tnt-Scene-EmptyContentPane", "tnt-Scene-ExternalLink", "tnt-Scene-FaceID", "tnt-Scene-Fingerprint", "tnt-Scene-Lock", "tnt-Scene-Mission", "tnt-Scene-NoApplications", "tnt-Scene-NoFlows", "tnt-Scene-NoUsers", "tnt-Scene-Radar", "tnt-Scene-Secrets", "tnt-Scene-Services", "tnt-Scene-SessionExpired", "tnt-Scene-SessionExpiring", "tnt-Scene-Success", "tnt-Scene-SuccessfulAuth", "tnt-Scene-Systems", "tnt-Scene-Teams", "tnt-Scene-Tools", "tnt-Scene-Unlock", "tnt-Scene-UnsuccessfulAuth", "tnt-Spot-ChartArea", "tnt-Spot-ChartArea2", "tnt-Spot-ChartBPMNFlow", "tnt-Spot-ChartBar", "tnt-Spot-ChartBullet", "tnt-Spot-ChartDoughnut", "tnt-Spot-ChartFlow", "tnt-Spot-ChartGantt", "tnt-Spot-ChartOrg", "tnt-Spot-ChartPie", "tnt-Spot-CodePlaceholder", "tnt-Spot-Company", "tnt-Spot-Components", "tnt-Spot-EmptyContentPane", "tnt-Spot-ExternalLink", "tnt-Spot-FaceID", "tnt-Spot-Fingerprint", "tnt-Spot-Lock", "tnt-Spot-Mission", "tnt-Spot-NoApplications", "tnt-Spot-NoFlows", "tnt-Spot-NoUsers", "tnt-Spot-Radar", "tnt-Spot-Secrets", "tnt-Spot-Services", "tnt-Spot-SessionExpired", "tnt-Spot-SessionExpiring", "tnt-Spot-Success", "tnt-Spot-SuccessfulAuth", "tnt-Spot-Systems", "tnt-Spot-Teams", "tnt-Spot-Tools", "tnt-Spot-Unlock", "tnt-Spot-UnsuccessfulAuth"].forEach((illustrationName) => registerIllustrationLoader(`tnt/V5/${illustrationName}`, loadAndCheck));
//# sourceMappingURL=IllustrationsV5TNT.js.map