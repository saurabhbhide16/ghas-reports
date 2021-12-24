// import * as core from '@actions/core'
// import * as github from '@actions/github'
// import * as xlsx from 'xlsx'
// import {graphql} from '@octokit/graphql'

// async function run(): Promise<void> {
//   try {
//     const { repository } = await graphql(
//         `{
//             repository(owner: "amitgupta7", name: "ghas-reports-action") {
//                 name,
//                 licenseInfo {name}
//                 dependencyGraphManifests {
//                     totalCount
//                     edges{
//                         node {
//                             filename
//                             dependencies {
//                                 edges {
//                                     node {
//                                         packageName
//                                         packageManager
//                                         requirements
//                                         repository {
//                                             licenseInfo {
//                                                 name
//                                             }
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//         `,
//         {
//           headers: {
//             authorization: `token ${process.env.INPUT_TOKEN}`,
//             accept: 'application/vnd.github.hawkgirl-preview+json'
//           },
//         }
//       );

//     const csvData: string[][] = []
//     const header: string[] = [
//         'manifest',
//         'packageName',
//         'packageManager',
//         'requirements',
//         'licenseInfo'
//     ]

//     csvData.push(header)
//     for (const dependency of repository.dependencyGraphManifests.edges) {
//         for (const dependencyEdge of dependency.node.dependencies.edges) {
//             //console.log(JSON.stringify(dependencyEdge.node, null, 2))
//             let licenseInfo =  ""
//             if( dependencyEdge.node.repository.licenseInfo ){
//                 licenseInfo = dependencyEdge.node.repository.licenseInfo.name
//             }
//             const row: string[] = [
//                 dependency.node.filename,
//                 dependencyEdge.node.packageName,
//                 dependencyEdge.node.packageManager,
//                 dependencyEdge.node.requirements,
//                 licenseInfo
//             ]

//             csvData.push(row)
//         }
//     }

//     const Pivot = require('quick-pivot')

//     const columnsToPivot = ['licenseInfo']
//     const rowsToPivot = ['manifest']
//     const aggregationDimensions = ['packageName']
//     const aggregator = 'count'
//     const pivot = new Pivot(csvData, rowsToPivot, columnsToPivot, aggregationDimensions, aggregator)
//     //console.log(pivot.data.table)

//     const pivotData: string[][] = []
//     for (const row of pivot.data.table) {
//         const pivotRow: string[] = []
//         for (const col of row.value) {
//             pivotRow.push(col)
//             //console.log(col)
//         }
//         pivotData.push(pivotRow)
//     }
//     //console.log(pivotData)
//     //console.log(csvData);
//       const wb = xlsx.utils.book_new()
//       const ws = xlsx.utils.aoa_to_sheet(pivotData)
//       xlsx.utils.book_append_sheet(wb, ws, 'dependencies')
//       xlsx.writeFile(wb, 'dependencies.xlsx')

//   } catch (error) {
//     if (error instanceof Error) core.setFailed(error.message)
//   }
// }

// run()
