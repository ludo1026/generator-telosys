'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var TelosysGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous Telosys generator!'));

        try {
        	var currentPaths = process.cwd().split(path.sep);
        	var currentDir = currentPaths[currentPaths.length-1];
        } catch(e) {
        	currentDir = "myproject";
        }
        
        var prompts = [{
            type: 'input',
            name: 'projectName',
            message: 'Project name',
            default: currentDir
        },{
            type: 'input',
            name: 'projectVersion',
            message: 'Project version',
            default: "0.1"
        },{
            type: 'input',
            name: 'rootPkg',
            message: 'Root package',
            default: "org.demo"
        },{
            type: 'input',
            name: 'src',
            message: 'Sources directory',
            default: "src/main/java"
        },{
            type: 'input',
            name: 'res',
            message: 'Resources directory',
            default: "src/main/resources"
        },{
            type: 'input',
            name: 'testSrc',
            message: 'Test sources directory',
            default: "src/test/java"
        },{
            type: 'input',
            name: 'testRes',
            message: 'Test resources directory',
            default: "src/test/resources"
        },{
            type: 'input',
            name: 'web',
            message: 'Web directory',
            default: "src/main/webapp"
        }];

        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;
            this.projectVersion = props.projectVersion;
            this.rootPkg = props.rootPkg;
            if(this.rootPkg != null) {
                this.entityPkg = props.rootPkg + ".model";
            }
            this.src = props.src;
            this.res = props.res;
            this.testSrc = props.testSrc;
            this.testRes = props.testRes;
            this.web = props.web;
            done();
        }.bind(this));
    },

    app: function () {
    	this.template('_package.json', 'package.json');
    	
    	// Eclipse config file
    	this.template('_.project', '.project');
    	
        // Telosys directory
        this.mkdir('TelosysTools');
        this.mkdir('TelosysTools/downloads');
        this.mkdir('TelosysTools/templates');
        this.mkdir('TelosysTools/lib');
        

        // telosys-tools.cfg
        var cfg = "#Telosys-Tools properties\n"
        cfg += "RepositoriesFolder=TelosysTools\n";
        cfg += "DownloadsFolder=TelosysTools/downloads\n";
        cfg += "TemplatesFolder=TelosysTools/templates\n";
        cfg += "LibrariesFolder=TelosysTools/lib\n";
        cfg += 'DOC=doc\n';
        cfg += 'TMP=tmp\n';
        if(this.projectName != null) {
            cfg += "ProjectVariable.PROJECT_NAME="+this.projectName+"\n";
            cfg += "ProjectVariable.MAVEN_ARTIFACT_ID="+this.projectName+"\n";
        }
        if(this.projectVersion != null) {
            cfg += "ProjectVariable.PROJECT_VERSION="+this.projectVersion+"\n";
        }
        if(this.rootPkg != null) {
            if (this.projectName != null) {
                cfg += "ProjectVariable.MAVEN_GROUP_ID=" + this.rootPkg + "." + this.projectName + "\n";
            } else {
                cfg += "ProjectVariable.MAVEN_GROUP_ID=" + this.rootPkg + "\n";
            }
        }
        if(this.rootPkg != null) {
            cfg += "ROOT_PKG="+this.rootPkg+"\n";
            cfg += "ENTITY_PKG="+this.entityPkg+"\n";
        }
        if(this.src != null) {
            cfg += "SRC="+this.src+"\n";
        }
        if(this.res != null) {
            cfg += "RES="+this.res+"\n";
        }
        if(this.testSrc != null) {
            cfg += "TEST_SRC="+this.testSrc+"\n";
        }
        if(this.testRes != null) {
            cfg += "TEST_RES="+this.testRes+"\n";
        }
        if(this.web != null) {
            cfg += "WEB="+this.web+"\n";
        }
        this.write("telosys-tools.cfg",cfg);

        // Project directories
        if(this.src != null) {
            this.mkdir(this.src);
            if(this.rootPkg != null) {
                this.mkdir(path.join(this.src, this.rootPkg));
            }
            if(this.entityPkg != null) {
                this.mkdir(path.join(this.src, this.entityPkg));
            }
        }
        if(this.res != null) {
            this.mkdir(this.res);
        }
        if(this.testSrc != null) {
            this.mkdir(this.testSrc);
            if(this.rootPkg != null) {
                this.mkdir(path.join(this.testSrc, this.rootPkg));
            }
            if(this.entityPkg != null) {
                this.mkdir(path.join(this.testSrc, this.entityPkg));
            }
        }
        if(this.testRes != null) {
            this.mkdir(this.testRes);
        }
        if(this.web != null) {
            this.mkdir(this.web);
            this.mkdir(path.join(this.web,"WEB-INF"));
        }
    },

    projectfiles: function () {
    }


});

module.exports = TelosysGenerator;
