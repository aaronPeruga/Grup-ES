from decouple import config


class Config:
    pass


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = config('DATABASE_URL', default='localhost')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STATIC_FOLDER = "/static"
    TEMPLATE_FOLDER = "/templates"
    SECRET_KEY = config('SECRET_KEY', default='localhost')


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STATIC_FOLDER = "../frontend/dist/static"
    TEMPLATE_FOLDER = "../frontend/dist"
    SECRET_KEY = "kdsfklsmfakfmafmadslvsdfasdf"


class TestConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///tests/test_data.db"
    STATIC_FOLDER = "../../frontend/dist/static"
    TEMPLATE_FOLDER = "../../frontend/dist"
    SECRET_KEY = "hdoashidhpisapjdioaspjiodpjoa"


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'test': TestConfig
}
