/*
*   Javacripts for front-end 
*/
"use strict";
/*  Switches addtitional info for custom attributes on Variable products
*   Depends on woocommerce\assets\js\frontend\add-to-cart-variation.js
*/
jQuery(document).ready(function($){
    var variationsForm = $( '.variations_form' );
    variationsForm.on( 'found_variation',{ variationsForm: self }, processMeta );
    variationsForm.on( 'reset_data',{ variationsForm: self }, resetMeta );

    function processMeta(event, variation){
        var mcmp_unit_val = $( '.product .woocommerce-product-attributes-item--mcmp_custom_unit .woocommerce-product-attributes-item__value' );
        if ( variation.mcmp_custom_unit ) {
			mcmp_unit_val.wc_set_content( variation.mcmp_custom_unit_html );
		} else {
			mcmp_unit_val.wc_reset_content();
		}
    }
    function resetMeta(event, variation){
        var mcmp_unit_val = $( '.product .woocommerce-product-attributes-item--mcmp_custom_unit .woocommerce-product-attributes-item__value' );
        mcmp_unit_val.wc_reset_content();
    }
});