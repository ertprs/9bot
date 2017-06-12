const chalk = require('chalk');

module.exports = {
    print: function () {
        console.log([
              chalk.yellow("      ,@$llllllllllll$W,")
            , chalk.yellow("     /llllllllllllllllllL")
            , chalk.yellow('    $lllllF""""""""*lllll&      ') + chalk.white("               ,,                      ]-                             ,   ,")
            , chalk.yellow("  ,$llll$            $llll$     ") + chalk.white("               '\"`                     ]-                                 [")
            , chalk.yellow(" /lllllF   /llllllL   YlllllL   ") + chalk.white('     @@g@@B@@r ]@F $@gg@B@@g  g@@NB@g  ]wM"""*N  ,@"""*g   @*""*N     @ ""@""')
            , chalk.yellow("{lllllL                }lllllL  ") + chalk.white("     $@-   ]@@ ]@F $@P   ]@@ $@P   ]@K ]-     ]L @      K @      $    $   [")
            , chalk.yellow("Ylllll&,,,,,,,,,,,,,   ,lllllF  ") + chalk.white('     $@    ]@@ ]@F $@P    @$ $@P****** ]-     ]F @""""""" @"""""""    $   [')
            , chalk.yellow(" \\llllllllllllllllF   /lllllF  ") + chalk.white("      $@    ]@@ ]@F $@P    @$ ]@@    ,  ]-     $  $        ],          $   @")
            , chalk.yellow("  'lllllL            @lllll`    ") + chalk.white("     **    '** **^ **^    **   *MMM*\"  **MMMM*'   \"MMM**   \"*MMM*  *  *   \"MMM")
            , chalk.yellow("    $llll$w,,,,,,,,,$llll$")
            , chalk.yellow("     YllllllllllllllllllF")
            , chalk.yellow("      \"&llllllllllllll$'")
            ].join("\n")
        );
    }
};