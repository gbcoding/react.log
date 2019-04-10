module.exports = ({ foodName, severity, flag }) => {
    const today = new Date();
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title">
        
                            <td>
                               Today's date: ${`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Food name: ${foodName}
                            </td>
                            
                         </tr>
                      </table>
                   </td>
                </tr>
                
                </tr>
                <tr class="item">
                   <td>Severity Number:</td>
                   <td>${severity}</td>
                </tr>
                <tr class="item">
                   <td>Flag:</td>
                   <td>${flag}</td>
                </tr>
             </table>
             <br />

          </div>
       </body>
    </html>
    `;
};