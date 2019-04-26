module.exports = ({ foodName, severity, flag, userName }) => {
    const today = new Date();
return `
   <!DOCTYPE html>
   <html>
   <head>
   <style>
      table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      }

      td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
      }

      tr:nth-child(even) {
      background-color: #dddddd;
      }
      img {
         width: 100%;
      }
   </style>
   </head>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <body>
      <h1 align="center"> React.log</h1>
      <h2 align="left"> Name: ${userName}</h2>
      <h3 align="left"> Date printed: ${`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`}</h3>
      <h3 align="left"> Time printed: ${`${today.toLocaleTimeString()}`}</h3>
      <table>
         <tr>
               <th>Food name</th>
               <th>Type</th>
               <th>Duration (mins)</th>
               <th>Severity (1- 9)</th>
               <th>Flagged</th>
               <th>Notes</th>
         </tr>
         <tr>
               <td>Nutz</td>
               <td>Snack</td>
               <td>10</td>
               <td>7</td>
               <td>Yes</td>
               <td>Face swelling/trouble breathing</td>
         </tr>
         <tr>
               <td>Chocolate bar</td>
               <td>Snack</td>
               <td>60</td>
               <td>6</td>
               <td>Yes</td>
               <td>Rashes all over body</td>
         </tr>
         <tr>
               <td>Tacos</td>
               <td>Lunch</td>
               <td>15</td>
               <td>3</td>
               <td>Yes</td>
               <td>A lot of coughing</td>
         </tr>
         <tr>
               <td>Milk</td>
               <td>Breakfast</td>
               <td>35</td>
               <td>5</td>
               <td>Yes</td>
               <td>Stomach ache</td>
         </tr>
         <tr>
               <td>Gum</td>
               <td>Snack</td>
               <td>23</td>
               <td>9</td>
               <td>Yes</td>
               <td>Extreme sneezing</td>
         </tr>
         <tr>
               <td>Watermelon</td>
               <td>Snack</td>
               <td>20</td>
               <td>7</td>
               <td>Yes</td>
               <td>Puffy eyes</td>
         </tr>
         <tr>
               <td>Pie</td>
               <td>Snack</td>
               <td>10</td>
               <td>5</td>
               <td>Yes</td>
               <td>Arm twitching</td>
         </tr>
         <tr>
               <td>Corn</td>
               <td>Snack</td>
               <td>45</td>
               <td>5</td>
               <td>Yes</td>
               <td>Massive headache</td>
         </tr>
         <tr>
               <td>Hotdog</td>
               <td>Dinner</td>
               <td>14</td>
               <td>8</td>
               <td>Yes</td>
               <td>Extreme sweating</td>
         </tr>
         <tr>
               <td>Chicken nuggets</td>
               <td>Dinner</td>
               <td>17</td>
               <td>3</td>
               <td>Yes</td>
               <td>Blurry vision</td>
         </tr>
         <tr>
               <td>Pecans</td>
               <td>Snack</td>
               <td>19</td>
               <td>6</td>
               <td>Yes</td>
               <td>Earache</td>
         </tr>
         <tr>
               <td>Cheese burger w/cheese</td>
               <td>Dinner</td>
               <td>22</td>
               <td>7</td>
               <td>Yes</td>
               <td>Chest pain</td>
         </tr>
         <tr>
               <td>Apple</td>
               <td>Snack</td>
               <td>6</td>
               <td>16</td>
               <td>Yes</td>
               <td>Loss of balance</td>
         </tr>
      </table>

      </body>
   </html>
    `;
};