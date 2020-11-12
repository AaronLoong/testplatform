/*
 Bootstable
 @description  Javascript library to make HMTL tables editable, using Bootstrap
 @version 1.1
 @autor Tito Hinostroza
*/
  //"use strict";
  //Global variables
let params = null;  		//Parameters
let colsEdi = null;
const newColHtml = '<div class="btn-group pull-right">' +
    '<button id="bEdit" type="button" class="btn btn-sm btn-default" onclick="rowEdit(this);">' +
    '<span class="glyphicon glyphicon-pencil" > </span>' +
    '</button>' +
    '<button id="bElim" type="button" class="btn btn-sm btn-default" onclick="rowElim(this);">' +
    '<span class="glyphicon glyphicon-trash" > </span>' +
    '</button>' +
    '<button id="bAcep" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="rowAcep(this);">' +
    '<span class="glyphicon glyphicon-ok" > </span>' +
    '</button>' +
    '<button id="bCanc" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="rowCancel(this);">' +
    '<span class="glyphicon glyphicon-remove" > </span>' +
    '</button>' +
    '</div>';
const colEdicHtml = '<td name="buttons">' + newColHtml + '</td>';

$.fn.SetEditable = function (options) {
      const defaults = {
          columnsEd: null,
          $addButton: null,
          onEdit: function () {
          },
          onBeforeDelete: function () {
          },
          onDelete: function () {
          },
          onAdd: function () {
          }
      };
      params = $.extend(defaults, options);
    this.find('thead tr').append('<th name="buttons"></th>');
    this.find('tbody tr').append(colEdicHtml);
    const $tabedi = this;
    if (params.$addButton != null) {
        params.$addButton.click(function() {
            rowAddNew($tabedi.attr("id"));
        });
    }
    if (params.columnsEd != null) {
        colsEdi = params.columnsEd.split(',');
    }
  };
function IterarCamposEdit($cols, tarea) {
    let n = 0;
    $cols.each(function() {
        n++;
        if ($(this).attr('name')==='buttons') return;
        if (!EsEditable(n-1)) return;
        tarea($(this));
    });
    
    function EsEditable(idx) {
        if (colsEdi==null) {
            return true;
        } else {
            for (let i = 0; i < colsEdi.length; i++) {
              if (idx === colsEdi[i])
                  return true;
            }
            return false;
        }
    }
}
function FijModoNormal(but) {
    $(but).parent().find('#bAcep').hide();
    $(but).parent().find('#bCanc').hide();
    $(but).parent().find('#bEdit').show();
    $(but).parent().find('#bElim').show();
    const $row = $(but).parents('tr');
    $row.attr('id', '');
}
function FijModoEdit(but) {
    $(but).parent().find('#bAcep').show();
    $(but).parent().find('#bCanc').show();
    $(but).parent().find('#bEdit').hide();
    $(but).parent().find('#bElim').hide();
    const $row = $(but).parents('tr');
    $row.attr('id', 'editing');
}
function ModoEdicion($row) {
    if ($row.attr('id')==='editing') {
        return true;
    } else {
        return false;
    }
}
function rowAcep(but) {
    const $row = $(but).parents('tr');
    const $cols = $row.find('td');
    if (!ModoEdicion($row)) return;
    IterarCamposEdit($cols, function($td) {
        const cont = $td.find('input').val();
      $td.html(cont);
    });
    FijModoNormal(but);
    params.onEdit($row);
}
function rowCancel(but) {
    const $row = $(but).parents('tr');
    const $cols = $row.find('td');
    if (!ModoEdicion($row)) return;
    IterarCamposEdit($cols, function($td) {
        const cont = $td.find('div').html();
        $td.html(cont);
    });
    FijModoNormal(but);
}
function rowEdit(but) {
    const $row = $(but).parents('tr');
    const $cols = $row.find('td');
    if (ModoEdicion($row)) return;
    IterarCamposEdit($cols, function($td) {
        const cont = $td.html();
        const div = '<div style="display: none;">' + cont + '</div>';
        const input = '<input class="form-control input-sm"  value="' + cont + '">';
        $td.html(div + input);
    });
    FijModoEdit(but);
}
function rowElim(but) {
    const $row = $(but).parents('tr');
    params.onBeforeDelete($row);
    $row.remove();
    params.onDelete();
}
function rowAddNew(tabId) {  let $cols;
    const $tab_en_edic = $("#" + tabId);
    const $filas = $tab_en_edic.find('tbody tr');
    if ($filas.length===0) {
        const $row = $tab_en_edic.find('thead tr');
        $cols = $row.find('th');
        let htmlDat = '';
        $cols.each(function() {
            if ($(this).attr('name')==='buttons') {
                htmlDat = htmlDat + colEdicHtml;
            } else {
                htmlDat = htmlDat + '<td></td>';
            }
        });
        $tab_en_edic.find('tbody').append('<tr>'+htmlDat+'</tr>');
    } else {
        let $ultFila = $tab_en_edic.find('tr:last');
        $ultFila.clone().appendTo($ultFila.parent());  
        $ultFila = $tab_en_edic.find('tr:last');
        $cols = $ultFila.find('td');
        $cols.each(function() {
            if ($(this).attr('name')==='buttons') {
            } else {
                $(this).html('');
            }
        });
    }
	params.onAdd();
}
function TableToCSV(tabId, separator) {
    let datFil = '';
    let tmp = '';
    const $tab_en_edic = $("#" + tabId);
    $tab_en_edic.find('tbody tr').each(function() {
        if (ModoEdicion($(this))) {
            $(this).find('#bAcep').click();
        }
        const $cols = $(this).find('td');
        datFil = '';
        $cols.each(function() {
            if ($(this).attr('name')==='buttons') {
            } else {
                datFil = datFil + $(this).html() + separator;
            }
        });
        if (datFil!=='') {
            datFil = datFil.substr(0, datFil.length-separator.length); 
        }
        tmp = tmp + datFil + '\n';
    });
    return tmp;
}
