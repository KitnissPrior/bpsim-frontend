// // import Papa from 'papaparse';

// // interface Data {
// //     name: string;
// //     age: number;
// // }

// // const data: Data[] = [
// //     { name: 'Иван', age: 25 },
// //     { name: 'Мария', age: 30 }
// // ];

// // export const exportToCsv = () => {
// //     const csv = Papa.unparse(data);
// //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.download = 'data.csv';
// //     link.click();
// // };
// import { CSVLink } from 'react-csv';

// const csvData = [
//     ["firstname", "lastname", "email"],
//     ["Ahmed", "Tomi", "ah@smthing.co.com"],
//     ["Raed", "Labes", "rl@smthing.co.com"],
//     ["Yezzi", "Min l3b", "ymin@cocococo.com"]
// ];

// export const CsvExportLink = () => (<CSVLink data= { csvData } > Download me </CSVLink>);
