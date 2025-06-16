SmartSprout Documentation
==========================

Welcome to SmartSprout's documentation! This is a Flask-based agricultural management system 
that helps farmers manage their fields, monitor weather conditions, and get crop recommendations.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   modules
   api_reference
   models
   services
   routes

Quick Start
-----------

SmartSprout is a web application that provides:

* User authentication and management
* Field management with GPS coordinates
* Real-time weather integration
* Crop-specific recommendations
* WebSocket support for live updates

Architecture Overview
--------------------

The application is structured as follows:

* **Models**: Data models for users and fields
* **Services**: Business logic for weather and crop recommendations
* **Routes**: API endpoints organized by functionality
* **Data Access**: JSON file-based data persistence

Main Components
===============

Models
------

.. automodule:: models.user
   :members:
   :undoc-members:
   :show-inheritance:

.. automodule:: models.field
   :members:
   :undoc-members:
   :show-inheritance:

Services
--------

.. automodule:: services.weather_service
   :members:
   :undoc-members:

.. automodule:: services.crop_service
   :members:
   :undoc-members:

Data Access
-----------

.. automodule:: data.data_access
   :members:
   :undoc-members:
   :show-inheritance:

Routes
------

Authentication Routes
~~~~~~~~~~~~~~~~~~~

.. automodule:: routes.auth
   :members:
   :undoc-members:

Fields Routes
~~~~~~~~~~~

.. automodule:: routes.fields
   :members:
   :undoc-members:

WebSocket Handlers
-----------------

.. automodule:: socketio_handlers
   :members:
   :undoc-members:

API Endpoints
=============

Authentication Endpoints
-----------------------

* ``POST /api/login`` - User login
* ``POST /api/logout`` - User logout
* ``POST /api/register`` - User registration
* ``GET /api/session`` - Get current session

Fields Endpoints
---------------

* ``GET /api/fields`` - Get all user fields
* ``GET /api/fields/<field_id>`` - Get specific field with forecast
* ``POST /api/fields/create`` - Create new field
* ``PUT /api/fields/<field_id>`` - Update field
* ``DELETE /api/fields/<field_id>`` - Delete field

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`