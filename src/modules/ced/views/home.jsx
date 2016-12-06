/**
 * create by nasa.wang
 */

import React from 'react'

const Home = React.createClass({
    main(container) {
        let mxClient = window.mxClient
        // Checks if the browser is supported
        if (!mxClient.isBrowserSupported()) {
            // Displays an error message if the browser is not supported.
            mxUtils.error('Browser is not supported!', 200, false);
        } else {
            // Note that these XML nodes will be enclosing the
            // mxCell nodes for the model cells in the output
            var doc = mxUtils.createXmlDocument();

            var person1 = doc.createElement('Person');
            person1.setAttribute('firstName', 'Daffy');
            person1.setAttribute('lastName', 'Duck');

            var person2 = doc.createElement('Person');
            person2.setAttribute('firstName', 'Bugs');
            person2.setAttribute('lastName', 'Bunny');

            var relation = doc.createElement('Knows');
            relation.setAttribute('since', '1985');
            relation.setAttribute('by', 'nasa');

            // Creates the graph inside the given container
            var graph = new mxGraph(container);

            // Optional disabling of sizing
            graph.setCellsResizable(false);

            // Configures the graph contains to resize and
            // add a border at the bottom, right
            graph.setResizeContainer(true);
            graph.minimumContainerSize = new mxRectangle(0, 0, 500, 380);
            graph.setBorder(60);

            // Stops editing on enter key, handles escape
            new mxKeyHandler(graph);

            // Overrides method to disallow edge label editing
            graph.isCellEditable = function(cell) {
                return !this.getModel().isEdge(cell);
            };

            // Overrides method to provide a cell label in the display
            graph.convertValueToString = function(cell) {
                if (mxUtils.isNode(cell.value)) {
                    if (cell.value.nodeName.toLowerCase() == 'person') {
                        var firstName = cell.getAttribute('firstName', '');
                        var lastName = cell.getAttribute('lastName', '');

                        if (lastName != null && lastName.length > 0) {
                            return lastName + ', ' + firstName;
                        }

                        return firstName;
                    } else if (cell.value.nodeName.toLowerCase() == 'knows') {
                        return cell.value.nodeName + ' (Since ' + cell.getAttribute('since', '') + ')' + ' by ' + cell.getAttribute('by', '');
                    }

                }

                return '';
            };

            // Overrides method to store a cell label in the model
            var cellLabelChanged = graph.cellLabelChanged;
            graph.cellLabelChanged = function(cell, newValue, autoSize) {
                if (mxUtils.isNode(cell.value) && cell.value.nodeName.toLowerCase() == 'person') {
                    var pos = newValue.indexOf(' ');

                    var firstName = (pos > 0)
                        ? newValue.substring(0, pos)
                        : newValue;
                    var lastName = (pos > 0)
                        ? newValue.substring(pos + 1, newValue.length)
                        : '';

                    // Clones the value for correct undo/redo
                    var elt = cell.value.cloneNode(true);

                    elt.setAttribute('firstName', firstName);
                    elt.setAttribute('lastName', lastName);

                    newValue = elt;
                    autoSize = true;
                }

                cellLabelChanged.apply(this, arguments);
            };

            // Overrides method to create the editing value
            var getEditingValue = graph.getEditingValue;
            graph.getEditingValue = function(cell) {
                if (mxUtils.isNode(cell.value) && cell.value.nodeName.toLowerCase() == 'person') {
                    var firstName = cell.getAttribute('firstName', '');
                    var lastName = cell.getAttribute('lastName', '');

                    return firstName + ' ' + lastName;
                }
            };

            // Adds a special tooltip for edges
            graph.setTooltips(true);

            var getTooltipForCell = graph.getTooltipForCell;
            graph.getTooltipForCell = function(cell) {
                // Adds some relation details for edges
                if (graph.getModel().isEdge(cell)) {
                    var src = this.getLabel(this.getModel().getTerminal(cell, true));
                    var trg = this.getLabel(this.getModel().getTerminal(cell, false));

                    return src + ' ' + cell.value.nodeName + ' ' + trg;
                }

                return getTooltipForCell.apply(this, arguments);
            };

            // Enables rubberband selection
            new mxRubberband(graph);

            // Adds an option to view the XML of the graph
            // document.body.appendChild(mxUtils.button('View XML', function() {
            //     var encoder = new mxCodec();
            //     var node = encoder.encode(graph.getModel());
            //     mxUtils.popup(mxUtils.getPrettyXml(node), true);
            // }));

            // Changes the style for match the markup
            // Creates the default style for vertices
            var style = graph.getStylesheet().getDefaultVertexStyle();
            style[mxConstants.STYLE_STROKECOLOR] = 'gray';
            style[mxConstants.STYLE_ROUNDED] = true;
            style[mxConstants.STYLE_SHADOW] = true;
            style[mxConstants.STYLE_FILLCOLOR] = '#DFDFDF';
            style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
            style[mxConstants.STYLE_FONTCOLOR] = 'black';
            style[mxConstants.STYLE_FONTSIZE] = '12';
            style[mxConstants.STYLE_SPACING] = 4;

            // Creates the default style for edges
            style = graph.getStylesheet().getDefaultEdgeStyle();
            style[mxConstants.STYLE_STROKECOLOR] = '#0C0C0C';
            style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
            style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
            style[mxConstants.STYLE_ROUNDED] = true;
            style[mxConstants.STYLE_FONTCOLOR] = 'black';
            style[mxConstants.STYLE_FONTSIZE] = '10';

            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = graph.getDefaultParent();

            // Adds cells to the model in a single step
            graph.getModel().beginUpdate();
            try
            {
                var v1 = graph.insertVertex(parent, null, person1, 40, 40, 180, 30);
                var v2 = graph.insertVertex(parent, null, person2, 200, 150, 180, 30);
                var e1 = graph.insertEdge(parent, null, relation, v2, v1);
            } finally
            {
                // Updates the display
                graph.getModel().endUpdate();
            }

            // Implements a properties panel that uses
            // mxCellAttributeChange to change properties
            graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt) {
                selectionChanged(graph);
            });

            selectionChanged(graph);
        }

        /**
			 * Updates the properties panel
			 */
        function selectionChanged(graph) {
            var div = document.getElementById('properties');

            // Forces focusout in IE
            graph.container.focus();

            // Clears the DIV the non-DOM way
            div.innerHTML = '';

            // Gets the selection cell
            var cell = graph.getSelectionCell();

            if (cell == null) {
                mxUtils.writeln(div, 'Nothing selected.');
            } else {
                // Writes the title
                var center = document.createElement('center');
                mxUtils.writeln(center, cell.value.nodeName + ' (' + cell.id + ')');
                div.appendChild(center);
                mxUtils.br(div);

                // Creates the form from the attributes of the user object
                var form = new mxForm();

                var attrs = cell.value.attributes;

                for (var i = 0; i < attrs.length; i++) {
                    createTextField(graph, form, cell, attrs[i]);
                }

                div.appendChild(form.getTable());
                mxUtils.br(div);
            }
        }

        /**
			 * Creates the textfield for the given property.
			 */
        function createTextField(graph, form, cell, attribute) {
            var input = form.addText(attribute.nodeName + ':', attribute.nodeValue);

            var applyHandler = function() {
                var newValue = input.value || '';
                var oldValue = cell.getAttribute(attribute.nodeName, '');

                if (newValue != oldValue) {
                    graph.getModel().beginUpdate();

                    try
                    {
                        var edit = new mxCellAttributeChange(cell, attribute.nodeName, newValue);
                        graph.getModel().execute(edit);
                        graph.updateCellSize(cell);
                    } finally
                    {
                        graph.getModel().endUpdate();
                    }
                }
            };

            mxEvent.addListener(input, 'keypress', function(evt) {
                // Needs to take shift into account for textareas
                if (evt.keyCode ==/*enter*/
                13 && !mxEvent.isShiftDown(evt)) {
                    input.blur();
                }
            });

            if (mxClient.IS_IE) {
                mxEvent.addListener(input, 'focusout', applyHandler);
            } else {
                // Note: Known problem is the blurring of fields in
                // Firefox by changing the selection, in which case
                // no event is fired in FF and the change is lost.
                // As a workaround you should use a local variable
                // that stores the focused field and invoke blur
                // explicitely where we do the graph.focus above.
                mxEvent.addListener(input, 'blur', applyHandler);
            }
        }
    },
    componentDidMount() {
        // this.main(document.getElementById('graphContainer'))
    },
    render() {
        let minHeight = window.innerHeight - 100
        return (
            <div className="page bg-white" style={{
                minHeight: `${minHeight}px`
            }}>
                <div className='page-aside-fixed page-aside-right'>
                    <div className="page-aside">

                        <div className="page-aside-switch">
                            <i className="icon wb-chevron-left" aria-hidden="true"></i>
                            <i className="icon wb-chevron-right" aria-hidden="true"></i>
                        </div>

                        <div className="page-aside-inner page-aside-scroll">
                            <div data-role="container">
                                <div data-role="content">
                                    <section className="page-aside-section">
                                        <h5 className="page-aside-title">Main</h5>
                                        <div className="list-group">
                                            <a className="list-group-item active" href="javascript:void(0)">
                                                <i className="icon wb-dashboard" aria-hidden="true"></i>Overview</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-pluse" aria-hidden="true"></i>Activity</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-heart" aria-hidden="true"></i>Dearest</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-folder" aria-hidden="true"></i>Folders</a>
                                        </div>
                                    </section>
                                    <section className="page-aside-section">
                                        <h5 className="page-aside-title">Filter</h5>
                                        <div className="list-group">
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-image" aria-hidden="true"></i>Images</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-volume-high" aria-hidden="true"></i>Audio</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-camera" aria-hidden="true"></i>Video</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-file" aria-hidden="true"></i>Notes</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-link-intact" aria-hidden="true"></i>Links</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-order" aria-hidden="true"></i>Files</a>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
<div className='page-aside-l-r'>
    <div className="page-main">
        <div className="page-header">
            <h1 className="page-title">Page Aside Right Static</h1>
        </div>
        <div className="page-content">
            <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">DEMO CONTENT</h3>
                </div>
                <div className="panel-body">
                    <p>Beata civitas malum iracundia scipio perspecta doleamus molestiae illa,
                        expectata commodi pericula liberos iuberet sitne suas aspernari,
                        numquidnam responsum cupiditatum romanum asperum. Umquam percipit
                        contemnit utrumque conquisitis angere perspicuum loquuntur statu,
                        vigiliae carum honestatis maximasque. Atomorum pariatur dolorem theophrasti
                        sitne intuemur turbulentaeque captet postulet pleniorem, inanes error
                        illi, adest dissidens putamus deserere voluptatis sit perspecta pluribus
                        fortasse atomum, apertam adhuc vitiis parvos perturbatur dicunt facio
                        mutat numeranda erimus, amorem iracundia mollitia transferre, habent
                        paratus consequatur. Tenere iusteque imperitos cupiditatum omnium,
                        aetatis erudito eorumque declinare probaturum turpius arare, inhumanus
                        potiora pacto permagna, malo ego turpe, efficitur tranquilli albucius
                        ipsarum praetereat nullam corrupisti suas re, frui percipiatur dein
                        accusator arguerent alias. Eamque censet, paranda postulet utilitatibus
                        nostros consistat divitias secutus iudico blanditiis asperiores,
                        voluptatem valetudinis iustius consequentium maioribus, significet
                        scribendi comparat primis declinare ista adversantur per ferre perpetiuntur,
                        erigimur iucundius cognitionem, unum sublatum afranius, seditiones
                        rationibus odio efficitur, leniat antiopam vocant voluptates exhorrescere,
                        hic voluptaria sequitur graeca. Quale desistemus praesentium habemus.</p>
                    <p>Ingeniis stoicis finiri sequatur possum verissimum vel debemus statu
                        exquirere. Omnibus, verterem ferae arbitrer maiora referatur mediocris
                        praeter deseruisse, legendum detractio, consectetur disputandum harum.
                        Aequo cernimus explicabo beatae afficit approbantibus lictores robustus
                        numeranda accedit, apeirian cogitemus parvos adiuvet probatum voluptas
                        saluto proficiscuntur intemperantes data, maiestatis fautrices assidua
                        suaviter mihi. Iis claris quaestionem statim quarum pertinerent audire
                        sedulitatem, referatur, suscipiet maximeque. Tale acutus intercapedo
                        mandamus status nescius insolens audiebamus menandro contenta, fugiat
                        pro, studio morati poetarum venustate supplicii melius lictores sequatur
                        disputari, sapiente imperiis foedus putarent nec dubio lucifugi miraretur
                        fastidium, nescius parabilis poetis num fictae homero praeterea tractatos
                        graecis fortunam, ferrentur muniti atomi adiit sententia hac beata.
                        Facultas dubitemus puerilis generis inflammati assentiar habeat.
                        Studia discordant. Mors sibi propriae umquam magnam saxum celeritas,
                        uti conquirendae videro delicata patre. Errore pertineant consequamur
                        orestem videatur motum usque cyrenaicisque, aptius praesertim tuo
                        istam existimare equos prospexit necesse intereant probatum, improborum,
                        integre motu nostram anteponant paulo, itaque prompta partus albam
                        turma propter litterae cetero, intemperantiam possumus, deterius.</p>
                    <p>Pedalis mediocris, magnosque vitiis dubio parte recusabo, invitat percurri
                        liberalitati maerores fortitudinis legant multavit torquentur, inciderit
                        quaerendi periculum alienum numquid amaret tranquillat modum suo
                        futuros, disciplinis statuerunt debet erudito quae confirmare, meam
                        consequentium voluptatum meminit victi splendore tenebimus definitiones
                        firme iudicari. Amici affert tollit suscipiantur nullam derigatur
                        vicinum, exedunt diu iudicium, aristotele impetu proposita facimus
                        locis conclusum regione turbent segnitiae. Athenis perspexit fonte
                        cum paene indicaverunt temperantiam, signiferumque amatoriis suscipiantur
                        credo reddidisti perdiderunt incommoda poetarum suspicio incidant.
                        Atomum, unde laetitia insolens laudatur, philosophi chaere. Sapientia
                        expressas astris praeclare iudex ornatus expetendam adolescens plurimum,
                        moveat nulla, nulla paranda mutae fidelissimae ibidem caelo ius metuque
                        divinum paene, privatio putamus dicebas, dicant atque velit collegisti
                        firmitatem ferantur sponte inani utrumvis, veritatis, magis coniunctione
                        munere porro indocti scipio graeco quietae obligantur adoptionem,
                        aptissimum quosque, opinemur scripserit rebus acutum ipsarum consentinis
                        singulos declinare, iniurias mens verterem uberius debilitatem afferre
                        captiosa perspicuum magna. Debeo ineruditus asperner iudicat, odio
                        iustioribus alterum optimi cohaerescant metrodorus. Laboribus meis
                        inquam caelo quoque videamus debilitatem metus gravis fugienda.</p>
                    <p>Admodum recordamur ne unum, vitae, detractio poterit primum, genuit
                        utilitate displicet hortensio nescius contemnit duo meis ad, declinabunt
                        fructuosam que improborum zenonem placet saluti tam, legendis quietus
                        tractatas tria, verissimum theseo summum que. Dividendo fictae patria
                        totam nostris texit aliena pecunias. Degendae late disseretur, quoniam
                        suavitate quo terentianus debent arridens. Fruuntur doloribus nimis
                        mandaremus assentiar, tempore expectata. Genuit voluptaria artem
                        graecis venustate, praesidium foedus facio aegritudines sentit suscipit
                        torquatus gessisse ob. Concursio quanti agam vestrae. Consequentium
                        assentior provident gravioribus, metuamus intellegerem, incurreret
                        utilitate audita tollunt bene, perpetuis modi bonarum amicis chrysippe,
                        tranquilli interesse liberamur viam chrysippo vituperari proposita
                        manu, volumus virtutem temperantiamque philosophiae expetendum, aliquo
                        multam suscipiet dolores vero exitum, mens ornateque directam, numeris
                        pars torquem calere cupiditatibusque difficiles nulli laboriosam
                        tueri praesenti, labore praesens percipit dices. Te legerint aequitate.
                        Constringendos. Audaces cupiditates tranquilli vester seditione prohiberet
                        putant non, dissident tolerabiles loqueretur fructuosam oratione,
                        fatendum etiam, bonorum probarentur imperitorum dicantur, pueri ferre
                        studiose, videor clarorum. Artifex regione conflixisse impetum graeci.
                        Omne desideraturam expressas deterret inciderint, fungimur nosmet.</p>
                </div>
            </div>
        </div>
    </div>
</div>

                <div className='page-aside-fixed page-aside-left'>
                    <div className="page-aside">

                        <div className="page-aside-switch">
                            <i className="icon wb-chevron-left" aria-hidden="true"></i>
                            <i className="icon wb-chevron-right" aria-hidden="true"></i>
                        </div>

                        <div className="page-aside-inner page-aside-scroll">
                            <div data-role="container">
                                <div data-role="content">
                                    <section className="page-aside-section">
                                        <h5 className="page-aside-title">Main</h5>
                                        <div className="list-group">
                                            <a className="list-group-item active" href="javascript:void(0)">
                                                <i className="icon wb-dashboard" aria-hidden="true"></i>Overview</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-pluse" aria-hidden="true"></i>Activity</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-heart" aria-hidden="true"></i>Dearest</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-folder" aria-hidden="true"></i>Folders</a>
                                        </div>
                                    </section>
                                    <section className="page-aside-section">
                                        <h5 className="page-aside-title">Filter</h5>
                                        <div className="list-group">
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-image" aria-hidden="true"></i>Images</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-volume-high" aria-hidden="true"></i>Audio</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-camera" aria-hidden="true"></i>Video</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-file" aria-hidden="true"></i>Notes</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-link-intact" aria-hidden="true"></i>Links</a>
                                            <a className="list-group-item" href="javascript:void(0)">
                                                <i className="icon wb-order" aria-hidden="true"></i>Files</a>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

})

export default Home

// <table style={{
//     position: 'relative'
// }}>
//     <tr>
//         <td>
//             <div id="graphContainer" style={{
//                 border: 'solid 1px black',
//                 overflow: 'hidden',
//                 width: '321px',
//                 height: '241',
//                 cursor: 'default'
//             }}></div>
//         </td>
//         <td valign="top">
//             <div id="properties" style={{
//                 border: 'solid 1px black',
//                 padding: '10px'
//             }}></div>
//         </td>
//     </tr>
// </table>
